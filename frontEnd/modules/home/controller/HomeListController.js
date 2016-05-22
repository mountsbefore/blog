define([], function () {
    var ctrl = function ($scope) {
        console.log('home.list.ctrl');
        $('.ui.sticky.menu').sticky({
            context:"#list"
        });
    };
    ctrl.$inject = ['$scope'];
    ctrl.registerName = 'home.list.ctrl';
    return ctrl;
});
