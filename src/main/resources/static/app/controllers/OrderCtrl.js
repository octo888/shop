
(function() {
    'use strict';
    angular.module('soloApp')
        .controller('OrderCtrl', ['$scope', '$routeParams', 'CartService', OrderCtrl]);

    function OrderCtrl($scope, $routeParams, CartService) {
        $scope.getOrder = getOrderDetails;

        function getOrderDetails() {
            CartService.getOrder($routeParams.orderId).then(function(data){
                $scope.order = data;
            });
        }

    }
}());