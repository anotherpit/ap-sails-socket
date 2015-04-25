describe("ap-sails-socket", function() {
    "use strict";

    beforeEach(angular.mock.module("ap-sails-socket"));

    describe("Constant DEFAULT_IO_SOCKET", function() {
        var DEFAULT_IO_SOCKET;
        beforeEach(angular.mock.inject(function(_DEFAULT_IO_SOCKET_) {
            DEFAULT_IO_SOCKET = _DEFAULT_IO_SOCKET_;
        }));

        it("=== window.io.socket", function(next) {
            DEFAULT_IO_SOCKET.should.be.exactly(window.io && window.io.socket);
            next();
        });
    });

    describe("Provider apSailsSocketProvider", function() {
        var apSailsSocketProvider;

        beforeEach(function(next) {
            angular.mock.module(function(_apSailsSocketProvider_) {
                apSailsSocketProvider = _apSailsSocketProvider_;
            });
            angular.mock.inject();
            next();
        });

        it("should exist and be an object", function(next) {
            apSailsSocketProvider.should.be.an.Object;
            next();
        });

        it(".settings === window.io.sails", function(next) {
            apSailsSocketProvider.settings.should
                .be.exactly(window.io && window.io.sails)
                .and.have.property("autoConnect");
            next();
        });
    });

    describe("Service apSailsSocket", function() {

        it("=== $window.io.socket", function(next) {
            // Before
            var apSailsSocket;
            var $window;
            angular.mock.inject(function(_$window_, _apSailsSocket_) {
                $window = _$window_;
                apSailsSocket = _apSailsSocket_;
            });

            // Test
            apSailsSocket.should.be.exactly($window.io && $window.io.socket);

            // Return
            next();
        });

        [false, true].forEach(function(on) {
            it("should " + (on ? "" : "not ") + "auto-connect when apSailsSocketProvider.settings.autoConnect is " + on, function(next) {
                // Before
                angular.mock.module(function(_apSailsSocketProvider_) {
                    _apSailsSocketProvider_.settings.autoConnect = on;
                    sinon.spy(window.io.socket, "_connect");
                });
                angular.mock.inject();

                // Test
                window.io.socket._connect.called.should.be.exactly(on);

                // After
                window.io.socket._connect.restore();

                // Return
                next();
            });
        });

    });
});
