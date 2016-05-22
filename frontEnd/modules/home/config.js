define(['angular'], function (angular) {    //  service and directive files requires  service,directive self register in files
    var module = angular.module('home', []);
    module.routerRules = [{
        "name": "home",
        "url": "/",
        "abstract": true,
        "templateUrl": "modules/home/views/layout.html",
        "controller": "home.ctrl",
        "ctrlPath": ["home/controller/HomeController"]
    }, {
        "name": "home.show",
        "url": "home",
        "views": {
            "menu": {
                "templateUrl": "modules/home/views/menu.html",
                "controller": "home.menu.ctrl"
            }, "list": {
                "templateUrl": "modules/home/views/list.html",
                "controller": "home.list.ctrl"
            }, "sidebar": {
                "templateUrl": "modules/home/views/sidebar.html",
                "controller": "home.sidebar.ctrl"
            }

        },
        "ctrlPath": ["home/controller/HomeMenuController",
            "home/controller/HomeListController",
            "home/controller/HomeSidebarController"]
    }];
    return module;
});