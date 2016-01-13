# babel-bits
> [babel](https://www.npmjs.com/package/babel-core) transform for [bit imports](https://github.com/MiguelCastillo/bit-imports) & [bit bundler](https://github.com/MiguelCastillo/bit-bundler).

### Install
```
npm install --save babel-bits
```

### Options

are forwarded right to [babel](https://babeljs.io/). Take a look at all available [options](https://babeljs.io/docs/usage/options/) to fine tune babel.

> babel-bits configures `es2015` and `react` presets. Feel free to provide your own.

### bit-imports example

``` javascript
bitimports.plugin("js", {
  transform: {
    handler: "babel-bits",
    options: {
      sourceMaps: "inline",
      presets: ["es2015"]
    }
  }
});
```

### Note on *generators
[babel](https://babeljs.io/) needs an external tool called [regenerator](https://github.com/facebook/regenerator) in order to support `generator`s.  To bring `generator` support into your application, you can just load [regenerator](https://github.com/facebook/regenerator) via script tag (or equivalent) and all `generator` code produced by babel will run just fine.  The idea here is that the code produced by babel can find the method `regeneratorRuntime` whenever it is executed.
