/**
 * main module
 * register common controller ,service ,directive
 */
define(['angular', 'lodash', 'angular-ui-router'], function (angular, _) {
    var dep = ['ng','ui.router'];
    var app = angular.module('common', dep);

    // config router
    // 定义一个函数接收各个模块的路由配置信息,遍历执行路由配置工作,
    // 配置工作中利用resolve,require各controller文件,动态注册controller
    // 路由状态的触发是通过url地址,或者state.go等接口,
    // ui-view只用来接收模板不触发特定路由状态,不带值的ui-view指令接收未命名模板,带值的ui-view接收特定命名的模板
    app.configRouter = function (modulePaths) {
        // enumerate arguments
        if (!arguments || arguments.length <= 0) return;
        if (_.isArray(modulePaths)) {
            var d = angular.injector(['ng']).get('$q').defer();
            _.forEach(modulePaths, function (modulePath, index) {
                require([modulePath], function (module) {// async function
                    // enumerate module config rules
                    _.forEach(module.routerRules, function (rule) {
                        module.config(['$stateProvider', '$controllerProvider', function ($stateProvider, $controllerProvider) {
                            $stateProvider.state(rule.name || '', _.extend({
                                "resolve": {
                                    "controller": ['$q', function ($q) {
                                        var defer = $q.defer();
                                        require([rule.ctrlPath], function (ctrl) {
                                            if (typeof ctrl == 'function') {
                                                ctrl.$$moduleName = module.name;
                                                $controllerProvider.register(ctrl.registerName, ctrl);
                                            }
                                            defer.resolve();
                                        });
                                        return defer.promise;
                                    }]
                                }
                            }, rule));
                        }]);
                    });
                    if (index === modulePaths.length-1) d.resolve();
                });
            });
            return d.promise;
        }
    };

    // register common service
    //app.service();

    // register common directive

    return app;
});
