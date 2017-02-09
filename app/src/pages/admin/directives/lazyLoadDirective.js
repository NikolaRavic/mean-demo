(function(){
    'use strict';
    angular.module('adminApp')
        .directive('lazyLoad', lazyLoad);

    lazyLoad.$inject = ['$window','eventBus'];

    function lazyLoad($window, eventBus) {
            return {
                scope: {
                    source: '=',
                    index: '@'
                },
                link: function (scope, element, attrs) {

                    var h = Math.max(document.documentElement.clientHeight, this.innerHeight || 0);
                    var window = angular.element($window);

                    element.parent().addClass('invisible');

                    eventBus.onEvent('updateSrc', function (event, data) {

                        element.parent().addClass('visible');
                        attrs.$set('src', scope.source);
                        attrs.$set('ng-if', true);

                    }, scope);

                    if(element[0].parentNode.offsetTop < h){
                        element.parent().addClass('visible');
                        attrs.$set('src', scope.source);
                        attrs.$set('ng-if', true);
                    }
                    window.on('resize scroll DOMContentLoaded load', function (ev) {

                        var h = Math.max(document.documentElement.clientHeight, this.innerHeight || 0);
                        var condition = this.pageYOffset + h - element[0].parentNode.offsetTop;
                        if(condition > -100){

                            eventBus.emit('imageIndex', scope.index);

                            attrs.$set('src', scope.source);
                            element.parent().addClass('visible');
                            scope.$apply(function () {
                                attrs.$set('src', scope.source);
                                attrs.$set('ng-if', true);
                                }
                            );

                        } else {
                            scope.$apply(function () {

                                attrs.$set('ng-if', false);
                                }
                            );
                        }
                    });
                }
            }
        };

}());