// 各个业务模块被common主模块所依赖才能工作,config注册的函数,run注册的函数才能执行,
// 业务模块早于主模块加载,所以各业务模块自己加载自己的依赖即时有共同依赖
define(['angular'], function (angular) {
    // config state
    var module = angular.module('register', ['ui.router']);
    module.routerRules = [{
        "name": "register",
        "url":"/register",
        "template": "<span ng-bind='user'></span>",
        "controller": "registerCtrl",
        "ctrlPath": "register/controller/indexCtrl"
    }];
    // service

    // directive

    return module;
});