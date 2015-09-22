"use strict";

let multimatch = require("multimatch");
let _ = require("lodash");
let eslint = require("eslint");

let CLIEngine = eslint.CLIEngine;

function plugin(options) {
  options = normalize(options);

  // normalize .eslintrc style environment definitions to cli style definitions
  if (_.isObject(options.eslintConfig.env)) {
    options.eslintConfig.env = Object.keys(options.eslintConfig.env);
  }
  // normalize .eslintrc style global definitions to cli style definitions
  if (_.isObject(options.eslintConfig.globals)) {
    options.eslintConfig.globals = Object.keys(options.eslintConfig.globals);
  }

  let cli = new CLIEngine(options.eslintConfig);
  let formatter = cli.getFormatter(options.formatter);

  return eslint;

  function eslint(files, metalsmith, done) {
    let filesTbProcessed = multimatch(Object.keys(files), options.src);
    let reports = [];
    let errorCount = 0;
    let warningCount = 0;

    _.each(filesTbProcessed, function(fileName) {
      let file = files[fileName];
      let report = cli.executeOnText(file.contents.toString());

      errorCount = errorCount + report.errorCount;
      warningCount = warningCount + report.warningCount;
      if (report.results.length > 0) {
        let problem = report.results[0];
        if (problem.messages.length === 0) { return; }
        problem.filePath = fileName; // normalize this, since we validated it as a text node
        reports.push(problem);
      }
    });

    let formatterReport = formatter(reports);
    if (formatterReport.length > 0) {
      console.log(formatterReport);
    }

    done(errorCount > 0 ? new Error("Linting failed with " + errorCount + " errors!") : null);
  }
}

function normalize(options) {
  let defaults = {
    src: ["**/*.js"],
    formatter: "stylish",
    eslintConfig: {
      useEslintrc: false
    }
  };
  options = _.merge({}, defaults, options);

  return options;
}

module.exports = plugin;
