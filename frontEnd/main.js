/**
 * require,angular bootstrap
 */
require.config({
    "paths": {
        "jquery":"libs/jquery",
        "framework":"framework/framework"
    },
    "shim": {}
});
// load modules
require(['framework','a','b'], function (app) {
    angular.bootstrap(document.querySelector('html'), app.name);
});