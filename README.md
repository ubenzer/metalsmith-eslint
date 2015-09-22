metalsmith-eslint
===============
[![Build Status](https://travis-ci.org/ubenzer/metalsmith-eslint.svg?branch=master)](https://travis-ci.org/ubenzer/metalsmith-eslint)
[![Dependency Status](https://david-dm.org/ubenzer/metalsmith-eslint.svg)](https://david-dm.org/ubenzer/metalsmith-eslint)
[![devDependency Status](https://david-dm.org/ubenzer/metalsmith-eslint/dev-status.svg)](https://david-dm.org/ubenzer/metalsmith-eslint#info=devDependencies)
       
An [Eslint](http://eslint.org/) plugin for Metalsmith.

## Installation

```sh
npm install --save metalsmith-eslint
```

## Getting Started

If you haven't checked out [Metalsmith](http://metalsmith.io/) before, head over to their website and check out the
documentation.

## Usage

```js
var eslint = require("metalsmith-elint");

metalsmith
  .use(eslint({
    src: ["**/*.js", "!**/vendor/**/*.js"],
    formatter: "unix",
    eslintConfig: JSON.parse(fs.readFileSync(path.join(process.cwd(), ".eslintrc"), "utf8"))
  }))
```

## Options
You can check the tests out to see some usage examples.                                                                                                          

### src
A [multimatch](https://www.npmjs.com/package/multimatch) expression that can be used to limit the files that will be eslinted. Default is `["**/*.js"]`

### formatter
One of the formatter name that is integrated to eslint. See the list [here](http://eslint.org/docs/developer-guide/nodejs-api#getformatter). Default is `stylish`.

### eslintConfig
A valid eslint config that will be passed to eslint. You can also read an `.eslintrc` file and pass the contents to this key directly. **Default none, a configuration is required**

To read `.eslintrc` you can use the following: `JSON.parse(fs.readFileSync(path.join(process.cwd(), ".eslintrc"), "utf8"))

## Contributing
Just open an issue or prepare a pull request.
