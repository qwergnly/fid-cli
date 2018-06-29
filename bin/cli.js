#!/usr/bin/env node
var program = require("commander");
const shell = require("shelljs");
const exec = shell.exec;
const create = require("../src/create.js");
const build = require("../src/build.js");
program
  .version(require("../package").version)
  .description("工业大脑脚手架")
  .option("-n, --name <name>", "your name", "花花");

program
  .command("start")
  .description("start")
  .action(function() {
    exec("egg-bin dev");
    // var version = exec('node --version', {silent:true}).stdout;
    // console.log(version)
  });

program
  .command("build")
  .description("build")
  .action(function(path) {
    build.build(path)
  });

program
  .command("new")
  .description("")
  .action(function(type, name) {
    switch (type) {
      case "page":
        create.addPage(name);
        break;
      case "component":
        create.addComponent(name);
    }
  });

program.parse(process.argv);

// console.log(program.name);
