
(function() {
    angular.module("soloApp")
        .factory("AdminService", ['$http', '$location', '$rootScope', AdminService]);

    function AdminService($http, $location, $rootScope) {
        return {
            authenticate: authenticate,
            logout: logout,
            removeBook: removeBook,
            getOrders: getOrders
        };

        function authenticate(user) {
            return $http({
                method: 'POST',
                url: "/loginUser",
                responseType: "json",
                params: {username: user.username, password: user.password}
            }).then(function (response) {
                if (response.data == 1) {
                    $rootScope.authenticated = true;
                    $location.path("/");
                }
                return response.data;
            });
        }

        function logout() {
            return $http({
                url: "/logout",
                responseType: "json"
            }).then(function (response) {
                $rootScope.authenticated = false;
                $location.path("/");
                window.location.reload();
                return response;
            });
        }

        function removeBook(bookId) {
            return $http({
                url: "/removeBook",
                responseType: "json",
                params: {bookId: bookId}
            }).then(function () {
                return true;
            });
        }

        function getOrders() {
            return $http({
                url: "/getOrderList",
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }
    }
}());