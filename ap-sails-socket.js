// Disable default autoConnect as we want to control autoConnect
// via standard Agnular config() function and service provider.
//
// To make the following line work you MUST include this file (or concat it)
// immediately right after the sails.io.js, as the latter uses setTimeout(0),
// so we have only one processor tick to override default settings.
// See: https://github.com/balderdashy/sails.io.js/blob/master/example/index.html
window.io.sails.autoConnect = false;

/**
 * @ngdoc module
 * @name ap-sails-socket
 */
var module = angular.module("ap-sails-socket", []);

/**
 * @ngdoc service
 * @name DEFAULT_IO_SOCKET
 * @type {Socket}
 * @description Default socket instance as set up before any Angular config()'s run
 */
module.constant("DEFAULT_IO_SOCKET", window.io && window.io.socket);

/**
 * @ngdoc provider
 * @name apSailsSocketProvider
 * @property {Object} settings Exposed window.io.sails settings
 * @property {string} settings.environment "production" or "development"
 * @property {Object} settings.sdk SDK info
 * @property {string} settings.sdk.version SDK version
 * @property {string} settings.sdk.versionString SDK version string
 * @property {Object} settings.autoConnect Whether to connct automatically to socket
 * @see https://github.com/balderdashy/sails.io.js#advanced-usage
 */
module.provider("apSailsSocket", function() {
    var provider = this;

    // Expose standard io.sails as apSailsSocketProvider.settings
    provider.settings = window.io && window.io.sails || {};

    provider.$get = /*@ngInject*/ function($window, DEFAULT_IO_SOCKET) {
        var io = $window.io;
        io.socket = io.socket || DEFAULT_IO_SOCKET;
        if (provider.settings.autoConnect) {
            io.socket._connect();
        }
        return io.socket;
    };

    return provider;
});

module.run(function(socket) {
    // This empty function is to explicitly declare
    // dependency on the 'socket' service
    // to ensure that provider instantiate it
    // for modules like 'angular-resource-sails'
    // that don't give a fuck to DI
    // and use window.io.socket directly.
    //
    // God bless dependency injection!
    //                             — Pit.
});
