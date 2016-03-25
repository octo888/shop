/**
 * Created by Viktor Moroz on 12/2/15.
 */

(function() {
    angular.module("soloApp")
        .factory("CartService", ['$localStorage', '$location', '$http', CartService]);

    function CartService($localStorage, $location, $http) {

        return {
            getCart: getCart,
            getCartLength: getCartLength,
            addToCart: addToCart,
            cartAmount: cartAmount,
            removeFromCart: removeItem,
            addOrder: addOrder,
            getOrder: getOrder
        };

        function getCart() {
            return $localStorage.cart;
        }

        function addToCart(book) {
            if (!$localStorage.cart) {
                $localStorage.cart = [];
            }
            $localStorage.cart.push(book);
        }

        function removeItem(book) {
            while($localStorage.cart.indexOf(book)  !== -1) {
                $localStorage.cart.splice($localStorage.cart.indexOf(book), 1);
            }
        }

        function getCartLength() {
            if($localStorage.cart) {
                return $localStorage.cart.length;
            } else {
                return 0;
            }
        }

        function cartAmount() {
            return function () {
                var total = 0;
                if($localStorage.cart) {
                    for (var i = 0; i < $localStorage.cart.length; i++) {
                        total += $localStorage.cart[i].price;
                    }
                }
                return total;
            }
        }

        function addOrder(order, itemsId) {
            return $http({
                method: 'POST',
                url: "/addOrder",
                responseType: "json",
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined},
                params: {username: order.username, email: order.email, phone: order.phone, amount: order.amount, items: itemsId}
            }).then(function (response) {
                $localStorage.cart = [];
                return response.data;
            });
        }

        function getOrder(id) {
            return $http({
                url: "/getOrderDetails",
                responseType: "json",
                params: {id: id}
            }).then(function (response) {
                return response.data;
            });
        }

    }
}());