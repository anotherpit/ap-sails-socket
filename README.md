ap-sails-socket
===============

[AngularJS](http://angularjs.org/) service wrapper for [sails.io](https://github.com/balderdashy/sails.io.js) (official [Socket.IO](http://socket.io/) client SDK for [SailsJS](http://sailsjs.org/)).

Why?
----

Because [dependency injection](https://docs.angularjs.org/guide/di), that's why. Configuring Socket.IO via global variables like `window.io.sails` sucks in Angular world. We need regular service, configurable via `config()`.

Installation
------------

```bash
bower install ap-sails-socket
```

```javascript
// tasks/pipeline.js
var jsFilesToInject = [
    // ...
    // The ap-sails-socket file must go immediately right after sails.io
    // See https://github.com/balderdashy/sails.io.js/blob/master/example/index.html for details
    "bower_components/sails.io.js/dist/sails.io.js",
    "bower_components/ap-sails-socket/ap-sails-socket.js",
    // ...
];
```

Usage
-----

```javascript
// assets/js/index.js
var module = angular.module("app", [
    "ap-sails-socket"
]);

module.config(function(apSailsSocketProvider) {
    // apSailsSocketProvider.settings === window.io.sails
    apSailsSocketProvider.settings.autoConnect = true;
});

module.controller("MainCtrl", function(apSailsSocket) {
    // apSailsSocket === window.io.socket
    apSailsSocket.get('/hello', function serverResponded(body, JWR) {
        // ...
    });
});
```


