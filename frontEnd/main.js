/**
 * require,angular bootstrap
 */
require.config({
    "paths": {
        "jquery": "libs/jquery/dist/jquery.min",
        "lodash": "libs/lodash/dist/lodash.min",
        "semantic-ui": "libs/semantic-ui/dist/semantic.min",
        "angular": "libs/angular/angular",
        "angular-ui-router": "libs/angular-ui-router/release/angular-ui-router",
        "common": "common/common",
        "restangular": "libs/restangular/dist/restangular.min",
        "home": "modules/home",
        "register": "modules/register"
    },
    "shim": {
        "angular": {
            "deps": ['jquery'],
            "exports": "angular"
        },
        "angular-ui-router": ['angular'],
        "restangular": {
            "deps": ['angular']
        },
        "semantic-ui": {
            "deps": ['jquery']
        }
    }
});
// load modules 所有的模块路由配置文件定义了模块
require(['angular', 'common'], function (angular, app) {
    // 配置路由不存在处理函数
    /*app.config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/error');
    }]);*/
    app.config([ function () {
        console.log('app config',new Date().getTime());
    }]);
    app.run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateNotFound', function (event, unfoundState, from, fromParams) {
            event.preventDefault();
            $state.go('pageError');
        });
    }]);


    //TODO:app.configRouter([all modules ])

    app.configRouter('register/config');
    setTimeout(function () {
        app.requires = ['register'];
        angular.bootstrap(document.querySelector('html'), [app.name]);

    },100);
});