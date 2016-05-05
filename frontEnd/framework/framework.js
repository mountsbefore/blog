/**
 * main module
 * register common controller ,service ,directive
 */
define(['angular', 'ui-router'], function (angular) {
    var dep = ['ng', 'ui.router'];
    var app = angular.module('framework', dep);
    // config router
    app.config(['$stateProvider', function ($stateProvider) {
        // config state
        
    }]);
    // register common service
    app.service();

    // register common directive

    return app;
});
