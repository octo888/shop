
(function() {
    'use strict';
    angular.module('soloApp')
        .controller('AdminCtrl', ['$scope', '$route', 'BlogService', 'ItemService', 'DayImgService', 'AdminService', AdminCtrl]);

    function AdminCtrl($scope, $route, BlogService, ItemService, DayImgService, AdminService) {
        $scope.addItem = addItem;
        $scope.removeItem = removeItem;
        $scope.getItems = getItems;
        $scope.getOrders = getOrders;
        $scope.addBlog = addBlog;
        $scope.addDay = addDay;

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
            var charact = angular.toJson($scope.inputs);
            var urls = $scope.urls.split(",");
            ItemService.addItem($scope.item, charact, urls).then(function(data) {});
            $route.reload();
        }

        function addBlog() {
            var urls = $scope.urls.split(",");
            BlogService.addBlog($scope.blog, urls).then(function(data) {});
            $route.reload();
        }

        function addDay() {
            DayImgService.addDayImg($scope.day).then(function(data) {});
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