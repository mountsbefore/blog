define([], function () {
    var ctrl = function ($scope) {
        console.log('home.sidebar.ctrl');
    };
    ctrl.$inject = ['$scope'];
    ctrl.registerName = 'home.sidebar.ctrl';
    return ctrl;
});
