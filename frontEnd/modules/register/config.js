// 加载是否单实例,父模块加载依赖后,子模块是否需加载相同模块(不需如果能保证父模块已经加载,最好自己加载,都是单实例)
define(['angular'], function (angular) {
    // config state
    var module = angular.module('register', []);
    module.routerRules = [{
        "name": "register",
        "url":"/register",
        "template": "<span ng-bind='user'></span>",
        "controller": "register.indexCtrl",
        "ctrlPath": "register/controller/indexCtrl"
    }];
    // service

    // directive

    return module;
});