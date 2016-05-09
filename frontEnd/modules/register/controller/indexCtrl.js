define([], function () {
    var ctrl = function ($scope) {
        $scope.user = 'scope';
    };
    ctrl.$inject = ['$scope'];
    ctrl.name = 'register.indexCtrl';
    return ctrl;
});