define([], function () {
    var ctrl = function ($scope) {
        console.log('home.menu.ctrl');
    };
    ctrl.$inject = ['$scope'];
    ctrl.registerName = 'home.menu.ctrl';
    return ctrl;
});
