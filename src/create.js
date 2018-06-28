const fs = require("fs-extra");
// const chalk = require('chalk')
const shell = require("shelljs");
let os = require("os");
let userName = os.userInfo().username;
let osType = os.type();
let source = "";
if (osType == "Darwin") {
  source = "/usr/local/lib/node_modules/fid-cli/templet/";
} else {
  source = `C:\\Users\\${userName}\\AppData\\Roaming\\npm\\node_modules\\fid-cli\\templet\\`;
}

exports.addComponent = function(_name) {
  if(typeof _name != "string"){
    return console.error('error input');
  }
  if(_name.indexOf('/')==-1){
    return console.error('error input');
  }
  let pageName = _name.split('/')[0]
  let componentName = _name.split('/')[1]
  let pageFile = `./assets/src/pages/${pageName}/index.jsx`
  let targetFile = `./assets/src/pages/${pageName}/mod/${componentName}`
  let sourceFile = ''

  if (osType == "Darwin") {
    sourceFile = source+'component/base';
  } else {
    sourceFile = source+'component\\base'
  }
  fs.readFile(pageFile, "utf8", function(err, data) {
    if (err) {
      return console.error(err);
    }
    let routerStr = `<Route path="/${componentName}" component={${componentName}}/>\n`
    let comStr = `\nimport ${componentName} from "./mod/${componentName}";\n`

    let routerIndex = data.indexOf('</Layout>')
    let comIndex = data.indexOf('ReactDOM.render')
    let str = insert_item(data,routerStr,routerIndex)
    str = insert_item(str,comStr,comIndex)

    fs.writeFile(pageFile, new Buffer(str), {encoding: "utf8"}, function(err) {
      if (err) {
        return console.error(err);
      }
    });
  });

  fs.copy(sourceFile, targetFile, err => {
    if (err) {
      return console.error(err);
    }
    console.log(`${componentName} component has created`);
    // shell.exec('npm run dev');
  });
};

exports.addPage = function(_name) {
  let name = typeof _name != "string" ? "demo" : _name;

  let targetPage = `./assets/src/pages/${name}`;
  let tmlFile = `./app/view/${name}.html`;

  fs.copy(source + "pages", targetPage, err => {
    if (err) {
      return console.error(err);
    }
    console.log(`${name} page has created`);
  });
  fs.copy(source + "page.html", tmlFile, err => {
    if (err) {
      return console.error(err);
    }
    fs.readFile(tmlFile, "utf8", function(err, data) {
      if (err) {
        return console.error(err);
      }

      let str = data.replace(/#name#/g, s => {
        return name;
      });

      fs.writeFile(tmlFile, new Buffer(str), {encoding: "utf8"}, function(err) {
        if (err) {
          return console.error(err);
        }
        console.log(`${name} tml has created`);
        // shell.exec('npm run dev');
      });
    });
  });
};

function insert_item(str,item,index){
  var newstr="";
  var tmp=str.substring(0,index-1);
  var estr=str.substring(index-1,str.length);
  newstr+=tmp+item+estr;
  return newstr;

}
