
(function() {
    'use strict';
    angular.module('soloApp').directive('fileModel', [ '$parse', function($parse) {
        return {
            restrict : 'A',
            link : function(scope, element, attrs) {
                var model = $parse(attrs.fileModel);
                var modelSetter = model.assign;

                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                    });
                });
            }
        };
    } ]);

}());

(function() {
    'use strict';
    angular.module('soloApp').directive('addToCartButton', function() {


        function link(scope, element, attributes) {
            element.on('click', function(event){
                var cartElem = angular.element(document.getElementsByClassName("badge-cart"));
                console.log(cartElem);
                var offsetTopCart = cartElem.prop('offsetTop');
                var offsetLeftCart = cartElem.prop('offsetLeft');
                var widthCart = cartElem.prop('offsetWidth');
                var heightCart = cartElem.prop('offsetHeight');
                var imgElem = angular.element(event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1]);
               /* console.log(angular.element(event.target.parentNode.parentNode.parentNode));
                console.log(angular.element(event.target.parentNode.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1]));*/
                console.log(imgElem);
                console.log(imgElem.prop('src'));
                console.log(imgElem.prop('currentSrc'));
                var parentElem = angular.element(event.target.parentNode.parentNode.parentNode);
                var offsetLeft = imgElem.prop("offsetLeft");
                var offsetTop = imgElem.prop("offsetTop");
                var imgSrc = imgElem.prop("currentSrc");
                console.log(offsetLeft + ' ' + offsetTop + ' ' + imgSrc);
                var imgClone = angular.element('<img src="' + imgSrc + '"/>');
                imgClone.css({
                    'height': '200px',
                    'position': 'absolute',
                    'top': offsetTop + 'px',
                    'left': offsetLeft + 'px',
                    'opacity': 0.5
                });
                imgClone.addClass('itemaddedanimate');
                parentElem.append(imgClone);
                setTimeout(function () {
                    imgClone.css({
                        'height': '100px',
                        'top': (offsetTopCart+heightCart/2)+'px',
                        'left': (offsetLeftCart+widthCart/2)+'px',
                        'opacity': 0.5
                    });
                }, 500);
                setTimeout(function () {
                    imgClone.css({
                        'height': 0,
                        'opacity': 0.5

                    });
                    cartElem.addClass('shakeit');
                }, 1000);
                setTimeout(function () {
                    cartElem.removeClass('shakeit');
                    imgClone.remove();
                }, 1500);
            });
        };


        return {
            restrict: 'E',
            link: link,
            transclude: true,
            replace: true,
            scope: {},
            template: '<button class="add-to-cart" ng-transclude></button>'
        };
    });

}());