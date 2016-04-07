(function() {
    'use strict';
    angular.module('soloApp')
        .controller('BlogCtrl', ['$scope', '$routeParams', 'BlogService', BlogCtrl]);

    function BlogCtrl($scope, $routeParams, BlogService) {
        var blogId = $routeParams.blogId;
        $scope.getBlogDetails = getBlogDetails;

        function getBlogDetails() {
            BlogService.getBlogDetails(blogId).then(function(data) {
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
