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
