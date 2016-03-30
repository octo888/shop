
(function() {
    angular.module("soloApp")
        .factory("DayImgService", ['$http', DayImgService]);

    function DayImgService($http) {
        return {
            addDayImg: addDayImg,
            getDayImgs: getDayImgs
        };

        function addDayImg(day) {
            return $http({
                method: "POST",
                url: "/addDayImg",
                params: {name: day.name, img: day.img},
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function getDayImgs() {
            return $http({
                url: "/getAllDayImgs",
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }
    }
}());