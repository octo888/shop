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
