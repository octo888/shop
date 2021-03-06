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


