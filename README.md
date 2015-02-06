# 6to5-bits
> [6to5](https://www.npmjs.com/package/6to5-core) transform for [bit loader](https://github.com/MiguelCastillo/bit-loader).

### Install
```
npm install 6to5-bits
```

### What is this?
It is simply a browserified bundle of [6to5-core](https://www.npmjs.com/package/6to5-core) that is exposed as a single method. This bundle is intended to be used as a [bit loader](https://github.com/MiguelCastillo/bit-loader) transform, but you can certainly use it directly by feeding in a source string and 6to5 options to the exposed method.

### How to use it?
The primary use case is intended for [bit imports](https://github.com/MiguelCastillo/bit-imports), or any other module loader that can configure bit loader transforms.

So, if you are using [bit import](https://github.com/MiguelCastillo/bit-imports), then you can configure it as follows:

```javascript
var importer = Bitimports.config({
  "transforms": [{
    "name": "node_modules/6to5-bits/dist/index.js"
  }]
});
```

And that's it. [bit imports](https://github.com/MiguelCastillo/bit-imports) will make sure to add 6to5 to the transformation workflow.

### Note on *generators
[6to5](https://6to5.org/) needs an external tool called [regenerator](https://github.com/facebook/regenerator) in order to support `generators`.  To bring `generator` support into your application, you can just load [regenerator](https://github.com/facebook/regenerator) via script tag (or equivalent) and all `genertor` code produced by 6to5 will run just fine.  The idea is that the code produced by 6to5 can find the method `regeneratorRuntime` whenever it is executed.

#### Example with fully configured bit imports running 6to5 with generator support in the browser
```html
<script src="node_modules/regenerator/runtime.js"></script>
<script src="node_modules/bit-imports/dist/bit-imports.js"></script>

<!-- You have to bootstrap an instance of bit imports -->
<script>
var System = (function() {
  var importer = Bitimports.config({
    "transforms": [
      {
        handler: ignore,
        ignore: ["node_modules/6to5-bits/dist/index.js"]
      }, {
        name: "node_modules/6to5-bits/dist/index.js"
      }
    ]
  });

  /**
   * Simple filter for excluding particular modules from being processed by the transformation pipeline.
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
