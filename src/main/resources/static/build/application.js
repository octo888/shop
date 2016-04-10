'use strict';

var appConfig = {
    imgPath: "https://s3.eu-central-1.amazonaws.com/moroz/img"
};

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
            when('/admin/add-day', {
                templateUrl: 'partials/admin/add-day.html',
                controller: 'AdminCtrl',
                requireLogin: true
            }).
            when('/admin/orders', {
                templateUrl: 'partials/admin/orders.html',
                controller: 'AdminCtrl',
                requireLogin: true
            }).
            when('/admin/search', {
                templateUrl: 'partials/admin/search.html',
                controller: 'AdminCtrl',
                requireLogin: true
            }).
            when('/admin/edit/1/:itemId', {
                templateUrl: 'partials/admin/edit-item.html',
                controller: 'AdminCtrl',
                requireLogin: true
            }).
            when('/admin/edit/2/:blogId', {
                templateUrl: 'partials/admin/edit-blog.html',
                controller: 'AdminCtrl',
                requireLogin: true
            }).
            when('/item/:itemId', {
                templateUrl: 'partials/item-detail.html',
                controller: 'ItemCtrl'
            }).
            when('/category/:catId', {
                templateUrl: 'partials/cat-detail.html',
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
                templateUrl: 'partials/order-detail.html',
                controller: 'OrderCtrl'
            }).
            when('/blogs', {
                templateUrl: 'partials/blogs.html',
                controller: 'BlogCtrl'
            }).
            when('/blog/:blogId', {
                templateUrl: 'partials/blog-detail.html',
                controller: 'BlogCtrl'
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
            getOrders: getOrders,
            searchByName: search
        };

        function search(input) {
            return $http({
                url: "/searchAllByName",
                responseType: "json",
                params: {name: input.name, type: input.type}
            }).then(function (response) {
                return response.data;
            });
        }

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
            addBlog: addBlog,
            getAllBlogs: getAllBlogs,
            getBlogDetails: getBlogDetails,
            editBlog: editBlog,
            addComment: addComment
        };

        function addComment(id, comment) {
            return $http({
                method: "POST",
                url: "/addComment",
                data: {id: id, author: comment.author, body: comment.body},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }
        function addBlog(o) {
            return $http({
                method: "POST",
                url: "/addBlog",
               // params: {name: blog.name, text: text, mainImg: blog.mainImg,  urls: urls},
                data: {name: o.name, img: o.img, text: o.text, urls: o.urls},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function editBlog(id, blog) {
            return $http({
                method: "POST",
                url: "/editBlog",
                params: {id: id, body: blog.body, name: blog.name, mainImg: blog.mainImg,  urls: blog.urls},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

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
        .factory("DayImgService", ['$http', DayImgService]);

    function DayImgService($http) {
        return {
            addDayImg: addDayImg,
            getDayImgs: getDayImgs
        };

        function addDayImg(day) {
            return $http({
                method: "POST",
                url: "/addDayImg",
                params: {name: day.name, img: day.img},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function getDayImgs() {
            return $http({
                url: "/getAllDayImgs",
                responseType: "json"
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
            getItemDetails: getItemDetails,
            addItem: addItem,
            editItem: editItem,
            parseByCatType: parseByCatType
        };

        function editItem(id, item, charact, urls) {
            return $http({
                method: 'POST',
                url: "/editItem",
                params: {id: id, category: item.categoryType, name: item.name, desc: item.description,
                    price: item.price, top: item.top, mainImg: item.mainImg, charact: charact, urls: urls},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function addItem(item, charact, urls) {
            return $http({
                method: "POST",
                url: "/addItem",
                params: {category: item.category, name: item.name, desc: item.desc,
                    price: item.price, top: item.top, mainImg: item.mainImg, charact: charact, urls: urls},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

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

        function parseByCatType(arr, num) {
            var res = [];
            for (var i =0; i < arr.length; i++) {

                if (arr[i].categoryType == num) {
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
        .controller('AdminCtrl', ['$scope', '$route', '$routeParams', 'BlogService', 'ItemService', 'DayImgService', 'AdminService', AdminCtrl]);

    function AdminCtrl($scope, $route, $routeParams, BlogService, ItemService, DayImgService, AdminService) {
        $scope.addItem = addItem;
        $scope.removeItem = removeItem;
        $scope.getItems = getItems;
        $scope.getOrders = getOrders;
        $scope.addBlog = addBlog;
        $scope.addDay = addDay;
        $scope.search = search;
        $scope.getEditItem = getEditItem;
        $scope.editItem = editItem;
        $scope.getEditBlog = getEditBlog;
        $scope.editBlog = editBlog;


        $scope.inputs = [];
        $scope.addField=function(){
            $scope.inputs.push({});
        };

        function search() {
            AdminService.searchByName($scope.input).then(function (data) {
                $scope.searchRes = data;
            })
        }


        function getEditItem() {
            var id = $routeParams.itemId;
            ItemService.getItemDetails(id).then(function (data) {
                $scope.item = data;
                $scope.item.categoryType = $scope.item.categoryType + "";

                var o = $scope.item.charact;

                for (var k in o) {
                    var res = {};
                    if (o.hasOwnProperty(k)) {
                        res.field = k;
                        res.value = o[k];
                    }
                    $scope.inputs.push(res);
                }
            });
        }

        function editItem() {
            var charact = angular.toJson($scope.inputs);
            ItemService.editItem($routeParams.itemId, $scope.item, charact, $scope.item.urls).then(function(data) {});
            $route.reload();
        }

        function getItems() {
            ItemService.getAllItems().then(function(data){
                $scope.books = data;
            });
        }

        function addItem () {
            var charact = angular.toJson($scope.inputs);
            var urls = $scope.urls.split(",");
            ItemService.addItem($scope.item, charact, urls).then(function(data) {});
            $route.reload();
        }

        function getEditBlog() {
            var id = $routeParams.blogId;
            BlogService.getBlogDetails(id).then(function (data) {
                $scope.blog = data;
            });
        }

        function editBlog() {
            BlogService.editBlog($routeParams.blogId, $scope.blog).then(function(data) {});
            $route.reload();
        }

        function addBlog() {
            var text = angular.toJson($scope.inputs);
            var urls = $scope.urls.split(",");
            var obj = {
                "name": $scope.blog.name,
                "img": $scope.blog.mainImg,
                "text": text,
                "urls": urls
            };
            BlogService.addBlog(obj).then(function(data) {});
            $route.reload();
        }

        function addDay() {
            DayImgService.addDayImg($scope.day).then(function(data) {});
            $route.reload();
        }

        function removeItem(typeId, id) {
             console.log(typeId);
             console.log(id);
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
        $scope.addComment = {
            submit: submitComment
        };
        $scope.getBlogDetails = getBlogDetails;
        $scope.getAll = getAll;

        function getAll() {
            BlogService.getAllBlogs().then(function(data) {
                $scope.blogs = data;

                /*for (var c = 0; k < data.length; c++) {
                    var o = data[c];

                    $scope.texts = [];
                    var i = 0;
                    for (var k in o) {
                        var res = '';
                        if (o.hasOwnProperty(k) && i < 2) {
                            res = o[k];
                            i++;
                        }
                        $scope.texts.push(res);
                    }
                }*/
            });
        }

        function getBlogDetails() {
            BlogService.getBlogDetails(blogId).then(function(data) {
                console.log(data);
                $scope.blog = data;

                var o = $scope.blog.text;
                $scope.texts = [];
                for (var k in o) {
                    var res = '';
                    if (o.hasOwnProperty(k)) {
                        res = o[k];
                    }
                    $scope.texts.push(res);
                }

                $scope.bigImg = data.mainImg;
                $scope.images = [];
                $scope.images.push(data.mainImg);
                $scope.images = $scope.images.concat(data.urls);
            });
        }

        $scope.setImage = function(imageUrl) {
            $scope.bigImg = imageUrl;
            //$scope.images = getMinImg($scope.images, imageUrl);
        };
        
        function submitComment() {
            console.log($scope.addComment);
            BlogService.addComment(blogId, $scope.addComment);
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
        var catId = $routeParams.catId;
        $scope.getItemsByCat = getItemsByCat;
        $scope.getItemDetails = getItemDetails;


        function getItemDetails() {
            ItemService.getItemDetails(itemId).then(function(data) {
                $scope.item = data;
                $scope.bigImg = data.mainImg;
                $scope.images = [];
                $scope.images.push(data.mainImg);
                $scope.images = $scope.images.concat(data.urls);
                /* $scope.mainImg = data.imagesId[0];
                 $scope.images = getMinImg(data.imagesId, $scope.mainImg);*/

            });
        }

        function getItemsByCat() {
            ItemService.getAllItems().then(function(data){
                $scope.items = ItemService.parseByCatType(data, catId);
                $scope.categoryName = function() {
                    if (catId == 1) {
                        return "Книги";
                    }
                    else if (catId == 2) {
                        return "Сувениры";
                    }
                    else if (catId == 3) {
                        return "Ручная работа";
                    }
                }();
            });
        }

        $scope.setImage = function(imageUrl) {
            $scope.bigImg = imageUrl;
            //$scope.images = getMinImg($scope.images, imageUrl);
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
        .controller('MainCtrl', ['$scope', 'ItemService', 'BlogService', 'DayImgService', MainCtrl]);

    function MainCtrl($scope, ItemService, BlogService, DayImgService) {
        $scope.count = 0;
        $scope.data = {};
        $scope.scroll = scroll;
        $scope.countPrev = countPrev;
        $scope.countNext = countNext;
        var content;
        var perPage = 4;
        var pageNumber = 1;

        ItemService.getAllItems().then(function(data){
            $scope.data.books = ItemService.parseByCatType(data, 1);
            $scope.data.souvs = ItemService.parseByCatType(data, 2);
            $scope.data.handmades = ItemService.parseByCatType(data, 3);
        });

        function scroll(name, dest) {
            if (dest) {
                pageNumber++;
                var showFrom = perPage * (pageNumber - 1);
                var showTo = showFrom + perPage;
                //pages = Math.ceil(inputList.length / perPage);

                angular.element('.book-item').hide().slice(showFrom, showTo).fadeIn('fast');
            } else {

            }
        }

        BlogService.getAllBlogs().then(function(data) {
            $scope.blogs = data;
        });

        DayImgService.getDayImgs().then(function (data) {
            $scope.days = data;
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
(function () {
    'use strict';
    angular.module('soloApp').directive('showTab', showTab);
    angular.module('soloApp').directive('owlInit', owlInit);
    angular.module('soloApp').directive('owlItem', owlItem);

    function showTab() {
        return {
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    }

    function owlInit() {
        return {
            restrict: 'A',
            //transclude: false,
            link: function(scope, element) {
                // wait for the last item in the ng-repeat then call init
                if(scope.$last) {
                    if ($(element).parent().length > 0) {
                        $(element.parent()).owlCarousel({
                            margin: 30,
                            smartSpeed: 450,
                            loop: false,
                            dots: false,
                            dotsEach: 1,
                            nav: true,
                            navClass: ['owl-prev fa fa-chevron-left', 'owl-next fa fa-chevron-right'],
                            responsive: {
                                0: { items: 1 },
                                768: { items: 3},
                                980: { items: 4}
                            }

                        })
                    }

                }
            }
        };
    }

    function owlItem() {
        return {
            restrict: 'A',
            //transclude: false,
            link: function(scope, element) {
                // wait for the last item in the ng-repeat then call init
                if(scope.$last) {
                    if ($(element).parent().length > 0) {
                        $(element.parent()).owlCarousel({
                            margin: 30,
                            smartSpeed: 450,
                            loop: false,
                            dots: false,
                            dotsEach: 1,
                            nav: true,
                            navClass: ['owl-prev fa fa-chevron-left own-owl-left', 'owl-next fa fa-chevron-right own-owl-right'],
                            responsive: {
                                0: { items: 1 },
                                768: { items: 2},
                                980: { items: 3}
                            }

                        })
                    }

                }
            }
        };
    }
}());
'use strict';

/* Filters */

(function() {

    angular.module('soloApp').filter('descsize', [descsize]);
    angular.module('soloApp').filter('selectedPrice', [selectedPrice]);

    function descsize() {
        return function (input, value) {
            if (input != null) {
                return input.substring(0, value) + '...';
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

