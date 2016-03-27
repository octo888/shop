(function() {
    'use strict';
    angular.module('soloApp')
        .controller('MainCtrl', ['$scope', 'ItemService', 'BlogService', MainCtrl]);

    function MainCtrl($scope, ItemService, BlogService) {
        $scope.count = 0;
        $scope.countPrev = countPrev;
        $scope.countNext = countNext;
        $scope.imgPath = getImgPath;
        var content;

        function getImgPath(item) {
            return appConfig.imgPath + "/book/" + item.mainImgUrl;
        }

        ItemService.getAllItems().then(function(data){
            console.log(data);
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
