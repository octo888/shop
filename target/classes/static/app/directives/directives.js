(function () {
    'use strict';
    angular.module('soloApp').directive('showTab', showTab);
    angular.module('soloApp').directive('owlInit', owlInit);
    angular.module('soloApp').directive('owlItem', owlItem);

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

    function owlInit() {
        return {
            restrict: 'A',
            //transclude: false,
            link: function(scope, element) {
                // wait for the last item in the ng-repeat then call init
                if(scope.$last) {
                    if ($(element).parent().length > 0) {
                        $(element.parent()).owlCarousel({
                            margin: 30,
                            smartSpeed: 450,
                            loop: false,
                            dots: false,
                            dotsEach: 1,
                            nav: true,
                            navClass: ['owl-prev fa fa-chevron-left', 'owl-next fa fa-chevron-right'],
                            responsive: {
                                0: { items: 1 },
                                768: { items: 3},
                                980: { items: 4}
                            }

                        })
                    }

                }
            }
        };
    }

    function owlItem() {
        return {
            restrict: 'A',
            //transclude: false,
            link: function(scope, element) {
                // wait for the last item in the ng-repeat then call init
                if(scope.$last) {
                    if ($(element).parent().length > 0) {
                        $(element.parent()).owlCarousel({
                            margin: 30,
                            smartSpeed: 450,
                            loop: false,
                            dots: false,
                            dotsEach: 1,
                            nav: true,
                            navClass: ['owl-prev fa fa-chevron-left own-owl-left', 'owl-next fa fa-chevron-right own-owl-right'],
                            responsive: {
                                0: { items: 1 },
                                768: { items: 2},
                                980: { items: 3}
                            }

                        })
                    }

                }
            }
        };
    }
}());