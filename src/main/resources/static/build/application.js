'use strict';

angular.module("soloApp", ['pascalprecht.translate', 'ngRoute', 'ngCookies', 'ngStorage', 'ngAnimate', 'ngTouch', 'angular-carousel'])
    .config(['$translateProvider', '$httpProvider', '$routeProvider', function ($translateProvider, $httpProvider, $routeProvider) {
        'use strict';

        var lang = "ru";
        angular.injector(['ngCookies']).invoke(['$cookies', function($cookies) {
            lang = $cookies.get("lang");
            if (!lang) {
                lang = "ru";
            }
        }]);

        $translateProvider.useUrlLoader("/messages/" + lang + ".json");
        $translateProvider.useSanitizeValueStrategy('escape');
        $translateProvider.preferredLanguage(lang);

        $routeProvider.
            when('/', {
                templateUrl: './partials/main.html',
                controller: 'MainCtrl'
            }).
            when('/login', {
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl'
            }).
            when('/admin/add-item', {
                templateUrl: 'partials/admin/add-item.html',
                controller: 'AdminCtrl',
                requireLogin: true
            }).
            when('/admin/remove-item', {
                templateUrl: 'partials/admin/remove-item.html',
                controller: 'AdminCtrl',
                requireLogin: true
            }).
            when('/admin/add-blog', {
                templateUrl: 'partials/admin/add-blog.html',
                controller: 'AdminCtrl',
                requireLogin: true
            }).
            when('/admin/orders', {
                templateUrl: 'partials/admin/orders.html',
                controller: 'AdminCtrl',
                requireLogin: true
            }).
            when('/item/:itemId', {
                templateUrl: 'partials/item-detail.html',
                controller: 'ItemCtrl'
            }).
            when('/cart', {
                templateUrl: 'partials/cart.html',
                controller: 'CartCtrl'
            }).
            when('/add-order', {
                templateUrl: 'partials/add-order.html',
                controller: 'CartCtrl'
            }).
            when('/order/:orderId', {
                templateUrl: 'partials/order-details.html',
                controller: 'OrderCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

        $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
    }])
    .run(function ($rootScope, $location) {

        $rootScope.$on('$routeChangeStart', function (event, next, curent) {
            $rootScope.alertClean();

            if (next.requireLogin) {
                if (!$rootScope.authenticated) {
                    $location.path('login');
                }
            }
        });
    });


(function() {
    angular.module('soloApp')
        .service('fileUpload', ['$http', fileUpload]);

    function fileUpload($http) {
        this.uploadFileToUrl = function (fd, uploadUrl) {

            $http.post(uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'Content-Type': undefined}
            })
                .success(function () {

                })
                .error(function () {
                });
        }
    }
}());

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

(function() {
    angular.module("soloApp")
        .factory("BlogService", ['$http', BlogService]);

    function BlogService($http) {
        return {
            getAllBlogs: getAllBlogs,
            getBlogDetails: getBlogDetails
        };

        function getAllBlogs() {
            return $http({
                url: "/getAllBlogs",
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function getBlogDetails(blogId) {
            return $http({
                url: "/getBlogDetails",
                responseType: "json",
                params: {blogId: blogId}
            }).then(function (response) {
                return response.data;
            });
        }
    }
}());

(function() {
    angular.module("soloApp")
        .factory("BookService", ['$http', BookService]);

    function BookService($http) {
        return {
            getAllBooks: getAllBooks,
            getBookDetails: getBookDetails
        };

        function getAllBooks() {
            return $http({
                url: "/getAllBooks",
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function getBookDetails(bookId) {
            return $http({
                url: "/getBook",
                responseType: "json",
                params: {bookId: bookId}
            }).then(function (response) {
                return response.data;
            });
        }
    }
}());
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

(function() {
    angular.module("soloApp")
        .factory("ItemService", ['$http', ItemService]);

    function ItemService($http) {
        return {
            getAllItems: getAllItems,
            getItemDetails: getItemDetails
        };

        function getAllItems() {
            return $http({
                url: "/getAllItems",
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function getItemDetails(itemId) {
            return $http({
                url: "/getItem",
                responseType: "json",
                params: {itemId: itemId}
            }).then(function (response) {
                return response.data;
            });
        }
    }
}());

(function() {
    'use strict';
    angular.module('soloApp')
        .controller('AdminCtrl', ['$scope', '$route', 'fileUpload', 'ItemService', 'AdminService', AdminCtrl]);

    function AdminCtrl($scope, $route, fileUpload, ItemService, AdminService) {
        $scope.addItem = addItem;
        $scope.removeItem = removeItem;
        $scope.getItems = getItems;
        $scope.getOrders = getOrders;
        $scope.addBlog = addBlog;

        $scope.inputs = [];
        $scope.addField=function(){
            $scope.inputs.push({});
        };

        function getItems() {
            ItemService.getAllItems().then(function(data){
                $scope.books = data;
            });
        }

        function addItem () {
            var inputs = angular.toJson($scope.inputs);
            var file1 = $scope.file1;
            var file2 = $scope.file2;
            var file3 = $scope.file3;
            var file4 = $scope.file4;

            var fd = new FormData();
            fd.append('category', $scope.category);
            fd.append('name', $scope.name);
            fd.append('desc', $scope.desc);
            fd.append('price', $scope.price);

            fd.append('charact', inputs);

            fd.append('file1', file1);
            fd.append('file2', file2);
            fd.append('file3', file3);
            fd.append('file4', file4);
            fileUpload.uploadFileToUrl(fd, "/addItem");

            $route.reload();
        }

        function addBlog() {
            var file1 = $scope.file1;
            var file2 = $scope.file2;
            var file3 = $scope.file3;
            var file4 = $scope.file4;
            var fd = new FormData();
            fd.append('name', $scope.blog.name);
            fd.append('body', $scope.blog.body);

            fd.append('file1', file1);
            fd.append('file2', file2);
            fd.append('file3', file3);
            fd.append('file4', file4);
            fileUpload.uploadFileToUrl(fd, "/addBlog");

            $route.reload();
        }

        function removeItem(id) {
            $scope.alert.success = true;
            /* AdminService.removeBook(id).then(function (result) {
             if(result) {
             $scope.alert.success = result;
             getBooks();
             }
             });*/
        }

        function getOrders() {
            AdminService.getOrders().then(function(data) {
                $scope.orders = data;
            })
        }
    }
}());


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

(function() {
    'use strict';
    angular.module('soloApp')
        .controller('BlogCtrl', ['$scope', '$routeParams', 'BlogService', BlogCtrl]);

    function BlogCtrl($scope, $routeParams, BlogService) {
        var blogId = $routeParams.blogId;


        BlogService.getItemDetails(blogId).then(function(data) {
            $scope.item = data;
            $scope.mainImg = data.imagesId[0];
            $scope.images = getMinImg(data.imagesId, $scope.mainImg);

        });

        $scope.setImage = function(imageUrl) {
            $scope.mainImg = imageUrl;
            $scope.images = getMinImg($scope.item.imagesId, imageUrl);
        };

        function getMinImg(arr, val) {
            var res = [];

            for (var i = 0; i < arr.length; i++) {
                if (val !== arr[i]) {
                    res.push(arr[i]);
                }
            }
            return res;
        }
    }
}());



(function() {
    'use strict';
    angular.module('soloApp')
        .controller('BookCtrl', ['$scope', '$routeParams', 'BookService', BookCtrl]);

    function BookCtrl($scope, $routeParams, BookService) {
        var bookId = $routeParams.bookId;

        BookService.getBookDetails(bookId).then(function(data) {
            console.log(data);
            $scope.book = data;
           // $scope.images = data.images;
        });
    }
}());

/**
 * Created by Viktor Moroz on 12/2/15.
 */

(function() {
    'use strict';
    angular.module('soloApp')
        .controller('CartCtrl', ['$scope', '$location', 'CartService', CartCtrl]);

    function CartCtrl($scope, $location, CartService) {
        $scope.cart = CartService.getCart();
        $scope.addOrder = addOrder;
        $scope.cartAmount = CartService.cartAmount();
        $scope.remove = removeFromCart;

        function removeFromCart(book) {
            CartService.removeFromCart(book);
        }

        function addOrder() {
            var items = CartService.getCart();
            function itemsId() {
                var arr = [];
                for(var i = 0; i < items.length; i++) {
                    arr.push(items[i].id);
                    return arr;
                }
            }

            $scope.order.amount = $scope.cartAmount();
            CartService.addOrder($scope.order, itemsId()).then(function(data) {
                $location.path('order/' + data.id);
            });
        }
    }
}());
(function() {
    'use strict';
    angular.module('soloApp')
        .controller('ItemCtrl', ['$scope', '$routeParams', 'ItemService', ItemCtrl]);

    function ItemCtrl($scope, $routeParams, ItemService) {
        var itemId = $routeParams.itemId;


        ItemService.getItemDetails(itemId).then(function(data) {
            $scope.item = data;
            $scope.mainImg = data.imagesId[0];
            $scope.images = getMinImg(data.imagesId, $scope.mainImg);

        });

        $scope.setImage = function(imageUrl) {
            $scope.mainImg = imageUrl;
            $scope.images = getMinImg($scope.item.imagesId, imageUrl);
        };

        function getMinImg(arr, val) {
            var res = [];

            for (var i = 0; i < arr.length; i++) {
                if (val !== arr[i]) {
                    res.push(arr[i]);
                }
            }
            return res;
        }
    }
}());

(function() {
    'use strict';
    angular.module('soloApp')
        .controller('LoginCtrl', ['$scope', 'AdminService', LoginCtrl]);

    function LoginCtrl($scope, AdminService) {
        $scope.login = login;
        $scope.cleanErrors = cleanErrors;

        function login() {
            AdminService.authenticate($scope.credentials).then(function(data) {
                $scope.errors = {};
                if (data == 0) {
                    $scope.errors.wrong = true;
                }
            });
        }

        function cleanErrors() {
            $scope.errors = {};
        }
    }
}());

(function() {
    'use strict';
    angular.module('soloApp')
        .controller('MainCtrl', ['$scope', 'ItemService', 'BlogService', MainCtrl]);

    function MainCtrl($scope, ItemService, BlogService) {
        $scope.count = 0;
        $scope.countPrev = countPrev;
        $scope.countNext = countNext;
        var content;

        ItemService.getAllItems().then(function(data){
            content = data;
            var arr = [];
            for (var i = $scope.count; i < 4; i++) {
                arr.push(data[i]);
            }
            $scope.items = arr;
        });

        BlogService.getAllBlogs().then(function(data) {
            $scope.blogs = data;
        });

        function countNext() {
            if ($scope.count < content.length - 4) {
                $scope.count++;
                var len = 4 + $scope.count;
                var arr = [];

                for (var i = $scope.count; i < len; i++) {
                    if (content[i]) {
                        arr.push(content[i]);
                    }
                }
                $scope.items = arr;
            }
        }

        function countPrev() {
            if ($scope.count > 0) {
                $scope.count--;
                var len = 4 + $scope.count;
                var arr = [];

                for (var i = $scope.count; i < len; i++) {
                    arr.push(content[i]);
                }
                $scope.items = arr;
            }
        }
    }
}());


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

(function() {
    'use strict';
    angular.module('soloApp').directive('fileModel', [ '$parse', function($parse) {
        return {
            restrict : 'A',
            link : function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    } ]);

}());

(function() {
    'use strict';
    angular.module('soloApp').directive('addToCartButton', function() {


        function link(scope, element, attributes) {
            element.on('click', function(event){
                var cartElem = angular.element(document.getElementsByClassName("badge-cart"));
                console.log(cartElem);
                var offsetTopCart = cartElem.prop('offsetTop');
                var offsetLeftCart = cartElem.prop('offsetLeft');
                var widthCart = cartElem.prop('offsetWidth');
                var heightCart = cartElem.prop('offsetHeight');
                var imgElem = angular.element(event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1]);
               /* console.log(angular.element(event.target.parentNode.parentNode.parentNode));
                console.log(angular.element(event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1]));*/
                console.log(imgElem);
                console.log(imgElem.prop('src'));
                console.log(imgElem.prop('currentSrc'));
                var parentElem = angular.element(event.target.parentNode.parentNode.parentNode);
                var offsetLeft = imgElem.prop("offsetLeft");
                var offsetTop = imgElem.prop("offsetTop");
                var imgSrc = imgElem.prop("currentSrc");
                console.log(offsetLeft + ' ' + offsetTop + ' ' + imgSrc);
                var imgClone = angular.element('<img src="' + imgSrc + '"/>');
                imgClone.css({
                    'height': '200px',
                    'position': 'absolute',
                    'top': offsetTop + 'px',
                    'left': offsetLeft + 'px',
                    'opacity': 0.5
                });
                imgClone.addClass('itemaddedanimate');
                parentElem.append(imgClone);
                setTimeout(function () {
                    imgClone.css({
                        'height': '100px',
                        'top': (offsetTopCart+heightCart/2)+'px',
                        'left': (offsetLeftCart+widthCart/2)+'px',
                        'opacity': 0.5
                    });
                }, 500);
                setTimeout(function () {
                    imgClone.css({
                        'height': 0,
                        'opacity': 0.5

                    });
                    cartElem.addClass('shakeit');
                }, 1000);
                setTimeout(function () {
                    cartElem.removeClass('shakeit');
                    imgClone.remove();
                }, 1500);
            });
        };


        return {
            restrict: 'E',
            link: link,
            transclude: true,
            replace: true,
            scope: {},
            template: '<button class="add-to-cart" ng-transclude></button>'
        };
    });

}());
'use strict';

/* Filters */

(function() {

    angular.module('soloApp').filter('descsize', [descsize]);
    angular.module('soloApp').filter('selectedPrice', [selectedPrice]);

    function descsize() {
        return function (input) {
            if (input != null) {
                return input.substring(0, 150) + '...';
            } else return null;
        }
    }

    function selectedPrice() {
        return function (items, value) {
            var filtered = [];

            if (value == null) {
                return items;
            } else {
                if (value == 100) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].price <= value) {
                            filtered.push(items[i]);
                        }
                    }
                    return filtered;
                }
                else if (value == 300) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].price >= 100 && items[i].price <= value) {
                            filtered.push(items[i]);
                        }
                    }
                    return filtered;
                }
                else if (value == 500) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].price >= 300 && items[i].price <= value) {
                            filtered.push(items[i]);
                        }
                    }
                    return filtered;
                }
                else {
                    if (value == 0) {
                        return items;
                    }
                }
            }

        }
    }

}());


$(function() {

    $('#bigCarousel').carousel('cycle');

    $('a.pop').click(function(e) {
        e.preventDefault();
    });

    $('a.pop').popover();

    $('[rel="tooltip"]').tooltip();

    $('.nav-tabs a:first').tab('show');

});


$('.add-to-cart').on('click', function () {
    var cart = $('.badge-cart');
    var imgtodrag = $(this).parent('.item-cart').find("img").eq(0);
    alert(imgtodrag);
    if (imgtodrag) {
        var imgclone = imgtodrag.clone()
            .offset({
                top: imgtodrag.offset().top,
                left: imgtodrag.offset().left
            })
            .css({
                'opacity': '0.5',
                'position': 'absolute',
                'height': '150px',
                'width': '150px',
                'z-index': '100'
            })
            .appendTo($('body'))
            .animate({
                'top': cart.offset().top + 10,
                'left': cart.offset().left + 10,
                'width': 75,
                'height': 75
            }, 1000, 'easeInOutExpo');

        setTimeout(function () {
            cart.effect("shake", {
                times: 2
            }, 200);
        }, 1500);

        imgclone.animate({
            'width': 0,
            'height': 0
        }, function () {
            $(this).detach()
        });
    }
});

