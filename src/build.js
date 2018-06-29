const shell = require("shelljs");
const exec = shell.exec;
const os = require("os");
const osType = os.type();

exports.build = function(path){
  let pathArr;
  let name;
  let script;
  if(typeof path != "string"){
    if (osType == "Windows_NT"){
      pathArr= shell.pwd().stdout.split('\\')
    }else{
      pathArr= shell.pwd().stdout.split('/')
    }
    name = pathArr[pathArr.length-1];
    script = `tar -cvf ${name}.tar ../${name}/`;
  }else{
    name = path;
    script = `tar -cvf ${name}.tar ${name}/`
  }

  exec("npm run release", function(code, stdout, stderr) {
    if (code != 0) {
      return console.error('编译失败');
    }
    exec(script, function(code, stdout, stderr) {
      if (code != 0) {
        return console.error('打包失败');
      }
      console.log('打包成功')
    });
  });
}
