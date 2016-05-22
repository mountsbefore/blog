/**
 * require,angular bootstrap
 */
require.config({
    "paths": {
        "jquery": "libs/jquery/dist/jquery.min",
        "lodash": "libs/lodash/dist/lodash.min",
        "semantic-ui": "libs/semantic-ui/dist/",
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
        "semantic-ui/semantic.min": {
            "deps": ['jquery']
        },
        "semantic-ui/components/sticky.min": {
            "deps": ['jquery']
        }
    }
});
// load modules 所有的模块路由配置文件定义了模块
require(['angular', 'common',
    'home/config', 'register/config',
    'semantic-ui/semantic.min', 'semantic-ui/components/sticky.min'], function (angular, app, home, register) {
    // 配置路由不存在处理函数
    app.config(['$urlRouterProvider', function ($urlRouterProvider) {
        console.log('app config', new Date().getTime());
        $urlRouterProvider.otherwise('/home');
    }]);
    app.run(['$rootScope', '$state', function ($rootScope, $state) {
        $rootScope.$on('$stateNotFound', function (event, unfoundState, from, fromParams) {
            event.preventDefault();
            $state.go('pageError');
        });
    }]);


    //TODO:app.configRouter([all modules ])
    var modules = ['home', 'register'];
    app.configRouter([home, register]);
    app.requires = app.requires.concat(modules);
    angular.bootstrap(document.querySelector('html'), [app.name]);

});