
(function() {
    angular.module("soloApp")
        .factory("ItemService", ['$http', ItemService]);

    function ItemService($http) {
        return {
            getAllItems: getAllItems,
            getItemDetails: getItemDetails,
            addItem: addItem,
            editItem: editItem,
            parseByCatType: parseByCatType
        };

        function editItem(id, item, charact, urls) {
            return $http({
                method: 'POST',
                url: "/editItem",
                params: {id: id, category: item.categoryType, name: item.name, desc: item.description,
                    price: item.price, top: item.top, mainImg: item.mainImg, charact: charact, urls: urls},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function addItem(item, charact, urls) {
            return $http({
                method: "POST",
                url: "/addItem",
                params: {category: item.category, name: item.name, desc: item.desc,
                    price: item.price, top: item.top, mainImg: item.mainImg, charact: charact, urls: urls},
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

        function parseByCatType(arr, num) {
            var res = [];
            for (var i =0; i < arr.length; i++) {

                if (arr[i].categoryType == num) {
                    res.push(arr[i]);
                }
            }
            return res;
        }
    }
}());