(function() {
    'use strict';
    angular.module('soloApp')
        .controller('BlogCtrl', ['$scope', '$route', '$routeParams', 'BlogService', BlogCtrl]);

    function BlogCtrl($scope, $route, $routeParams, BlogService) {
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
            BlogService.addComment(blogId, $scope.addComment).then(function(data) {
                getBlogDetails();
            });
        }
    }
}());
