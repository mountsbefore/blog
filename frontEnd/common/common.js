/**
 * main module
 * register common controller ,service ,directive
 */
define(['angular', 'lodash', 'angular-ui-router'], function (angular, _) {
    var dep = ['ng', 'ui.router'];
    var app = angular.module('common', dep);

    // config router
    //定义一个函数接收各个模块的路由配置信息,遍历执行路由配置工作,配置工作中利用resolve,require各controller文件,动态注册controller
    app.configRouter = function () {
        // enumerate arguments
        if (!arguments || arguments.length <= 0) return;
        _.forEach(arguments, function (module) {
            console.log('module',module,new Date().getTime());
            require([module], function (module) {
                // enumerate module config rules
                _.forEach(module.routerRules, function (rule) {
                    console.log('rule',rule,module,new Date().getTime());
                    module.config(['$stateProvider', '$controllerProvider', function ($stateProvider, $controllerProvider) {
                        $stateProvider.state(rule.name || '', _.extend({
                            "resolve": {
                                "controller": ['$q', function ($q) {
                                    var defer = $q.defer();
                                    require([rule.ctrlPath], function (ctrl) {
                                        console.log('ctrl',ctrl);
                                        if (typeof ctrl[length - 1] == 'function') {
                                            ctrl[length - 1].$$moduleName = module.name;
                                            $controllerProvider.register(ctrl.name, ctrl);
                                        }
                                        defer.resolve();
                                    });
                                    return defer.promise;
                                }]
                            }
                        }, rule));
                        console.log('config');
                    }]);
                });
            });
        });
    };

    // register common service
    //app.service();

    // register common directive

    return app;
});
