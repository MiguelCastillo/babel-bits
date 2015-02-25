# babel-bits
> [babel](https://www.npmjs.com/package/babel-core) transform for [bit imports](https://github.com/MiguelCastillo/bit-imports).

### Install
```
npm install babel-bits
```

### What is this?
It is simply a browserified UMD bundle of [babel-core](https://www.npmjs.com/package/babel-core) that is exposed as a single method. This bundle is intended to be used as a [bit imports](https://github.com/MiguelCastillo/bit-imports) transform. But you can certainly use it directly by feeding in an object with a source property string along with babel options.

### How to use it?
The primary use case is intended for [bit imports](https://github.com/MiguelCastillo/bit-imports), or any other module loader that can configure [bit loader](https://github.com/MiguelCastillo/bit-loader) transforms.

To configure it with [bit import](https://github.com/MiguelCastillo/bit-imports), you can do the following:

```javascript
var importer = bitimports.config({
  "transforms": [{
    "name": "node_modules/babel-bits/dist/index.js"
  }]
});
```

### Note on *generators
[babel](https://babeljs.io/) needs an external tool called [regenerator](https://github.com/facebook/regenerator) in order to support `generator`s.  To bring `generator` support into your application, you can just load [regenerator](https://github.com/facebook/regenerator) via script tag (or equivalent) and all `generator` code produced by babel will run just fine.  The idea here is that the code produced by babel can find the method `regeneratorRuntime` whenever it is executed.

#### Example with fully configured bit imports running babel with generator support in the browser
```html
<script src="node_modules/regenerator/runtime.js"></script>
<script src="node_modules/bit-imports/dist/bit-imports.js"></script>

<!-- You have to bootstrap an instance of bit imports. -->
<script>
var System = (function() {
  var importer = bitimports.config({
    "paths": {
      "bable": "node_modules/babel-bits/dist/index.js"
    },
    "transforms": [{
        name: "ignore",
        handler: ignore,
        ignore: ["bable"]
      }, {
        name: "bable"
      }]
  });

  /**
   * Simple filter for excluding particular modules from being processed by
   * the transformation pipeline.
   */
  function ignore(moduleMeta) {
    var ignoreList = this.ignore;
    return !(ignoreList && ignoreList.length && ignoreList.indexOf(moduleMeta.name) !== -1);
  }

  return importer;
})();

var require = System.require;
</script>

<!-- Now you can load your ES6 application with support for generators -->
<script>System.import("src/app");</script>
```
