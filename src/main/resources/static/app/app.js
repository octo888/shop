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
