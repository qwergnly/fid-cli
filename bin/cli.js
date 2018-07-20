#!/usr/bin/env node
var program = require("commander");
// const shell = require("shelljs");
// const exec = shell.exec;
const create = require("../src/create.js");
const build = require("../src/build.js");
const package = require("../src/package.js");


program
  .version(require("../package").version)
  .description("EID cli")
  // .option("-n, --name <name>", "your name", "花花");

// program
//   .command("start")
//   .description("start")
//   .action(function() {
//     // exec("egg-bin dev");
//     // var version = exec('node --version', {silent:true}).stdout;
//     // console.log(version)
//   });

program
  .command("build")
  .description("fid build [path]")
  .action(function(path) {
    build.build(path)
  });

program
  .command("new")
  .description("fid new page [pagename] or fid new component [pagename/componentname]")
  .action(function(type, name) {
    switch (type) {
      case "page":
        create.addPage(name);
        break;
      case "component":
        create.addComponent(name);
    }
  });

  program
  .command("package")
  .description("fid package [packagename] [version]")
  .action(function(name, version) {
    package.packageComponent(name, version)
  });

program.parse(process.argv);

// console.log(program.name);
