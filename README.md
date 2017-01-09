# ES6 Boilerplate

Just change the name of the library in the package.json. That's it. 
The package name variable will be the entry point for the library in browser case. 
You can change this behaviour here tools/webpack.config.base.js the library field.
Develop and enjoy.

### Write a library in ES6

-   webpack for bundling, exporting in UMD (with the name of the package in browser case), support for process.env in source code
-   babel, of course
-   eslint (airbnb + valid-jsdoc)
-   jasmine for test with mocha reporter
-   documentation automagically generated

### Commands

-   git clone <this repo> && rm .git && git init
-   npm run build // generate dist/&lt;package.name>.js, dist/&lt;package.name>.min.js, dist/&lt;package.name>.min.js.map 
-   npm run test
-   npm run test:watch    // run tests while typing
-   npm run documentation // generate docs folder with .html, append docs to the readme.md

### Release a new version

-   npm version patch|minor|major
    This will generate the docs/<version> and dist/<version>
    so you can have the build version committed for that tag

# API

## NetworkInfo

Connection module. A simple module to check if connectivity is on or off
Usage:

**Examples**

```javascript
Connection.initialize();
Connection.addListener((event) => console.log(event.networkState, event.type));
Connection.removeListener(listenerRegisteredBefore);
Connection.checkConnection().networkState
Connection.checkConnection().type
```

### initialize

bind listeners to online|offline events
if it runs in cordova context must be called after deviceready
and cordova-plugin-network should be installed

### addListener

Register a function to be called on connection change

**Parameters**

-   `listener` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** the listener to register

### removeListener

UnRegister a function

**Parameters**

-   `listener` **[function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function)** the listener to unregister

### hostReachable

Host reachable make a simple sync HEAD request 
to location.hostname or custom url
with a param to disable the cache

**Parameters**

-   `url` **\[[string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)]** simple url to call without querystring (optional, default `window.location.hostname`)

Returns **[boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** 

## connectionStatus

type {object}

## UNSUPPORTED

type {boolean}
