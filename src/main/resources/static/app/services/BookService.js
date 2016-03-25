
(function() {
    angular.module("soloApp")
        .factory("BookService", ['$http', BookService]);

    function BookService($http) {
        return {
            getAllBooks: getAllBooks,
            getBookDetails: getBookDetails
        };

        function getAllBooks() {
            return $http({
                url: "/getAllBooks",
                responseType: "json"
            }).then(function (response) {
                return response.data;
            });
        }

        function getBookDetails(bookId) {
            return $http({
                url: "/getBook",
                responseType: "json",
                params: {bookId: bookId}
            }).then(function (response) {
                return response.data;
            });
        }
    }
}());