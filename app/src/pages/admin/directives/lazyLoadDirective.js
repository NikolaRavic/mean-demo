(function(){
    'use strict';
    angular.module('adminApp')
        .directive('lazyLoad', function ($document, $window) {
            return {
                link: function (scope, element, attrs) {
                    angular.element($window).on('resize', function (ev) {
                        console.log(element[0].offsetTop);
                    });
                }
            }
        });

}());