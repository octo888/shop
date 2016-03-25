

(function() {
    'use strict';
    angular.module('soloApp')
        .controller('BookCtrl', ['$scope', '$routeParams', 'BookService', BookCtrl]);

    function BookCtrl($scope, $routeParams, BookService) {
        var bookId = $routeParams.bookId;

        BookService.getBookDetails(bookId).then(function(data) {
            console.log(data);
            $scope.book = data;
           // $scope.images = data.images;
        });
    }
}());
