"use strict";
let should = require("should");
let sinon = require("sinon");
let eslint = require("../");
let fs = require("fs");
let path = require("path");
let Metalsmith = require("metalsmith");

describe("metalsmith-eslint", function() {
  let sandbox = null;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    sandbox.stub(console, "log");
  });

  afterEach(function() {
    sandbox.restore();
  });

  it("should work with an eslintrc configuration with env and globals and a formatter, failing on a file with correct console output", function(done) {
    Metalsmith("test/fixtures/basic")
      .use(eslint({
        eslintConfig: JSON.parse(fs.readFileSync(path.join(process.cwd(), "test/fixtures/basic/src/strict-eslint-rules"), "utf8")),
        formatter: "unix"
      }))
      .build(function(err) {
        err.should.be.an.Error();
        err.message.should.equal("Linting failed with 3 errors!");
        sinon.assert.calledOnce(console.log);
        sinon.assert.calledWithExactly(console.log, "eslintThisFail.js:1:1: Use the global form of \"use strict\". [Warning/strict]\neslintThisFail.js:1:14: Unexpected space before function parentheses. [Error/space-before-function-paren]\neslintThisFail.js:1:16: There should be no spaces inside this paren. [Error/space-in-parens]\neslintThisFail.js:2:15: Strings must use doublequote. [Error/quotes]\neslintThisWarn.js:1:1: Use the global form of \"use strict\". [Warning/strict]\n\n5 problems");
        return done();
      });
  });

  it("should obey file filters, and only warn but not fail if there is no error", function(done) {
    Metalsmith("test/fixtures/basic")
      .use(eslint({
        src: ["**/*.js", "!**Fail**"],
        eslintConfig: JSON.parse(fs.readFileSync(path.join(process.cwd(), "test/fixtures/basic/src/strict-eslint-rules"), "utf8")),
        formatter: "unix"
      }))
      .build(function(err) {
        should(err).be.null();
        sinon.assert.calledOnce(console.log);
        sinon.assert.calledWithExactly(console.log, "eslintThisWarn.js:1:1: Use the global form of \"use strict\". [Warning/strict]\n\n1 problem");
        return done();
      });
  });

  it("should not output any output and not fail if there is no error and warning", function(done) {
    Metalsmith("test/fixtures/basic")
      .use(eslint({
        src: ["**/*Success.js"],
        eslintConfig: JSON.parse(fs.readFileSync(path.join(process.cwd(), "test/fixtures/basic/src/strict-eslint-rules"), "utf8"))
      }))
      .build(function(err) {
        should(err).be.null();
        sinon.assert.notCalled(console.log);
        return done();
      });
  });
});
