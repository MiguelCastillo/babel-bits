# 6to5-bits
Is a browserified version of [6to5-core](https://www.npmjs.com/package/6to5-core) bundled as a [bit loader](https://github.com/MiguelCastillo/bit-loader) transform.

### Install
```
npm install 6to5-bits
```

### How to use it?
You can load it via a module loader that can configure transforms in bit loader, such as [bit imports](https://github.com/MiguelCastillo/bit-imports)

If you are using [bit import](https://github.com/MiguelCastillo/bit-imports), then you can configure it as follows:

```javascript
var importer = Bitimports.config({
  "transforms": [{
    "name": "node_modules/6to5-bits/dist/index.js"
  }]
});

```

And that's it. [bit imports](https://github.com/MiguelCastillo/bit-imports) will make sure to add 6to5 to the transformation workflow.

### Note on *generators
[6to5](https://6to5.org/) needs an external tool called [regenerator](https://github.com/facebook/regenerator) in order to support `generators`.  To bring `generator` support you can just load [regenerator](https://github.com/facebook/regenerator) in a script tag and all `generator` code produced by 6to5 will just run.


#### Example with fully configured bit imports running 6to5 with generator support
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

// Expose the require interface since 6to5 uses it to load dependencies in the code is produces
var require = System.require;
</script>

<!-- Now you can load you ES6 application with support for generators -->
<script>System.import("src/app");</script>
```
