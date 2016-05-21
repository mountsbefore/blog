define([], function () {
    var ctrl = function ($scope) {
        $scope.user = 'scope';
        console.log('controller');
    };
    ctrl.$inject = ['$scope'];

    console.log(Object.getOwnPropertyDescriptor(ctrl,'name'));
    ctrl.registerName = 'register.ctrl'; // 这里不能使用name属性,function name属性不可写,匿名函数name属性值是""
    return ctrl;
});