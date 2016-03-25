'use strict';

/* Filters */

(function() {

    angular.module('soloApp').filter('descsize', [descsize]);
    angular.module('soloApp').filter('selectedPrice', [selectedPrice]);

    function descsize() {
        return function (input) {
            if (input != null) {
                return input.substring(0, 150) + '...';
            } else return null;
        }
    }

    function selectedPrice() {
        return function (items, value) {
            var filtered = [];

            if (value == null) {
                return items;
            } else {
                if (value == 100) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].price <= value) {
                            filtered.push(items[i]);
                        }
                    }
                    return filtered;
                }
                else if (value == 300) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].price >= 100 && items[i].price <= value) {
                            filtered.push(items[i]);
                        }
                    }
                    return filtered;
                }
                else if (value == 500) {
                    for (var i = 0; i < items.length; i++) {
                        if (items[i].price >= 300 && items[i].price <= value) {
                            filtered.push(items[i]);
                        }
                    }
                    return filtered;
                }
                else {
                    if (value == 0) {
                        return items;
                    }
                }
            }

        }
    }

}());

