
(function() {
    angular.module("soloApp")
        .factory("ItemService", ['$http', ItemService]);

    function ItemService($http) {
        return {
            getAllItems: getAllItems,
            getItemDetails: getItemDetails,
            addItem: addItem
        };

        function addItem(item, charact, urls) {
            return $http({
                method: "POST",
                url: "/addItem",
                params: {category: item.category, name: item.name, desc: item.desc,
                    price: item.price, mainImg: item.mainImg, charact: charact, urls: urls},
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
    }
}());