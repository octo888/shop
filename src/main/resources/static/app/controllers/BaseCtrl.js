

(function() {
    'use strict';
    angular.module('soloApp')
        .controller('BaseCtrl', ['$scope', '$rootScope', '$cookies', 'AdminService', 'CartService', BaseCtrl]);

    function BaseCtrl($scope, $rootScope, $cookies, AdminService, CartService) {
        checkSession();
        $scope.cartLength = CartService.getCartLength;
        $scope.addToCart = addToCart;
        $scope.logout = logout;
        $rootScope.alertClean = alertClean;
        $scope.alert = {
            success: false,
            error: false
        };

        function logout() {
            AdminService.logout();
        }

        function addToCart(item) {
            CartService.addToCart(item);
        }

        function checkSession() {
            if ($cookies.get("admin_sid")) {
                $rootScope.authenticated = true;
            }
        }

        function alertClean() {
            $scope.alert = {
                success: false,
                error: false
            };
        }
    }
}());
