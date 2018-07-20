const fs = require("fs-extra");
const shell = require("shelljs");
const os = require("os");
const exec = shell.exec;
let userName = os.userInfo().username;
let osType = os.type();
let source = "";
if (osType == "Windows_NT") {
  source = `C:\\Users\\${userName}\\AppData\\Roaming\\npm\\node_modules\\fid-cli\\templet\\`;
} else {
  source = "/usr/local/lib/node_modules/fid-cli/templet/";
}
let name = ''


exports.packageComponent = function(_name, _version){
  if(typeof _name != "string"){
    return console.error("模块名称无效");
  }
  if(typeof _version != "string"){
    return console.error("版本号无效");
  }
  name = _name
  let version = _version;
  let sourceFile
  sourceFile = source+'fidView'

  fs.ensureDir(`../${name}_out`)
  .then((err)=>{if(!err) return handleError('创建失败')})
  .then(()=>fs.copy(sourceFile, `../${name}_out`))
  .then((err)=>{if(err) return handleError(err)})
  .then(()=>fs.copy('./', `../${name}_out/component`))
  .then((err)=>{if(err) return handleError(err)})
  .then(()=>fs.readFile(`../${name}_out/package.json`, "utf8"))
  .then((data)=>{
    if(!data) return handleError('读取失败')
    let json = JSON.parse(data)
    json.name = `@ali/${name}`
    json.version = version
    let str = JSON.stringify(json)
    return str
  })
  .then((data)=>{
    if(!data) return handleError('读取失败')
    return fs.writeFile(`../${name}_out/package.json`, new Buffer(data), {encoding: "utf8"})
  })
  .then((err)=>{
    if(err) return handleErrorr(err)
    shell.cd(`../${name}_out`);
    exec('tnpm i', function(code, stdout, stderr){
      if (code != 0) {
        return handleError('安装依赖失败');
      }
      exec('npm run babel', function(code, stdout, stderr) {
        if (code != 0) {
          return handleError('编译失败');
        }
        exec('tnpm publish', function(code, stdout, stderr){
          if (code != 0) {
            return handleError('发布失败');
          }
          fs.remove(`../${name}_out`)
        })
      });
    })
  })
}

function handleError(err) {
  console.error(`error: ${err}`);
  fs.remove(`../${name}_out`)
}
