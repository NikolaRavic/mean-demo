(function(){
    'use strict';
    angular.module('adminApp')
        .directive('lazyLoad', lazyLoad);

    lazyLoad.$inject = ['$window', 'eventBus'];

    // Directive which is used to apply lazy loading to images.
    // It calculates the position of image wrapper element in a current viewport and decides when to set src attribute to img element.
    // Source of image is fetched from a current scope when directive element lives
    // param: threshold can be set to what ever height under the current bottom position of the page user wants images to start loading
    // ***Network log can be checked to notice when images are fetched***

    function lazyLoad($window, eventBus) {
            return {
                scope: {
                    source: '=',
                    threshold: '='
                },
                link: function (scope, element, attrs) {

                    //
                    var h = Math.max(document.documentElement.clientHeight, this.innerHeight || 0);
                    var window = angular.element($window);

                    //event that triggers src update after filter is applied
                    eventBus.onEvent('trigger', function (event, data) {

                        attrs.$set('src', scope.source);

                    }, scope);

                    if(element[0].parentNode.offsetTop < h){

                        attrs.$set('src', scope.source);

                    }else {
                    }

                    //events that triggers calculation of a current element position and if decided sets src attribute of image

                    window.on('resize scroll DOMContentLoaded load', function (ev) {

                        var offsetDifference = this.pageYOffset + h - element[0].parentNode.offsetTop;

                        if(offsetDifference > -scope.threshold){

                            scope.$apply(function(){
                                attrs.$set('src', scope.source);
                            });


                        } else {

                        }
                    });
                }
            }
        };

}());