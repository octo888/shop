(function () {
    'use strict';
    angular.module('soloApp').directive('showTab', showTab);

    function showTab() {
        return {
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    }


}());