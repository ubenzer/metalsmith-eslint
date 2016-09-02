metalsmith-eslint
===============
[![Gitter](https://img.shields.io/gitter/room/ubenzer/metalsmith-eslint.svg?maxAge=2592000&style=flat-square)](https://gitter.im/ubenzer/metalsmith-eslint)
[![Travis](https://img.shields.io/travis/ubenzer/metalsmith-eslint.svg?maxAge=3600&style=flat-square)](https://travis-ci.org/ubenzer/metalsmith-eslint)
[![David](https://img.shields.io/david/ubenzer/metalsmith-eslint.svg?maxAge=3600&style=flat-square)](https://david-dm.org/ubenzer/metalsmith-eslint)
[![David](https://img.shields.io/david/dev/ubenzer/metalsmith-eslint.svg?maxAge=3600&style=flat-square)](https://david-dm.org/ubenzer/metalsmith-eslint#info=devDependencies)
[![Codecov](https://img.shields.io/codecov/c/github/ubenzer/metalsmith-eslint.svg?maxAge=3600&style=flat-square)](https://codecov.io/gh/ubenzer/metalsmith-eslint)
[![npm](https://img.shields.io/npm/v/metalsmith-eslint.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/metalsmith-eslint)
[![npm](https://img.shields.io/npm/dt/metalsmith-eslint.svg?maxAge=3600&style=flat-square)](https://www.npmjs.com/package/metalsmith-eslint)
     
An [Eslint](http://eslint.org/) plugin for [Metalsmith](http://metalsmith.io/).

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

To read `.eslintrc` you can use the following: `JSON.parse(fs.readFileSync(path.join(process.cwd(), ".eslintrc"), "utf8"))`

## Contributing
Just open an issue or prepare a pull request.
