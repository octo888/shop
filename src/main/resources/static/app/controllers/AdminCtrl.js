
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

                var o = $scope.blog.text;

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

        function editBlog() {
            $scope.blog.text = angular.toJson($scope.inputs);
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