# babel-ignore

A `babel-register` function that prevents the ignoring of modules that
explicitly opt-in to the `babel-register` compile process. The reason for this
is that `babel-register` ignores all `node_modules` by default forcing everybody
to publish babel compiled code to the npm registry by default.

## Installation

```
npm install --save babel-ignore
```

And add it your `babel-register` hook like this:

```js
var ignore = require('babel-ignore');

require('babel-register')({ ignore: ignore });
```

## Opt-in

So how do you tell your modules to opt-in to the `babel-register`. This is done
by adding a property to the `package.json` of your project. Simply add:

```js
"babel-ignore": false
```

As property and you're done! So a complete package.json of a module that uses
babel and opts-in to the `babel-reqister` using the `babel-ignore` module could
look like:

```js
{
  "name": "babel-ignore-example",
  "version": "0.0.2",
  "description": "Example package.json that uses babel-ignore properties",
  "main": "index.js",
  "dependencies": {
    "babel-preset-es2015": "6.18.0",
    "babel-preset-react": "6.16.0"
  },
  "babel-ignore": false,
  "babel": {
    "presets": [
      "babel-preset-es2015",
      "babel-preset-react"
    ]
  }
}
```

## Frequently Asked Questions

- **I see that babel also supports a babel object in the package.json, why not use it**
  - Babel throws an exception when it encounters a option that it doesn't
    recognize. So we had to invent another property that this module could read
    out.
- **Just compile your code and be done with it**
  - I don't want to setup and multi step build process for each ES6 module that
    I write. This is something that should be fixed by tooling, not by
    libraries and packages them selfs. The only other option is to write ES5
    directly but once you start writing ES6 there isn't a cell in your body that
    wants to write ES5 anymore.

## License

MIT
