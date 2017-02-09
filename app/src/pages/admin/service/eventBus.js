(function(){
    'use strict';
    angular.module('adminApp')
        .service('eventBus', eventBus);
    
    function eventBus($rootScope) {

        this.emit = function (topic, data) {
            $rootScope.$emit(topic, data);
        }
        this.onEvent = function (topic, func, scope) {
            return $rootScope.$on(topic, func);

            if(scope){
                scope.$onDestroy($rootScope.$$listeners.topic =[]);
            }
        }
    }

}());