(function(){
    'use strict';

    angular.module('adminApp')
        .service('imagesApiService', function ($http, LOCAL_HOST) {
            var self = this;
            self.images = [];

            this.getAllImages = function () {
                return $http.get(LOCAL_HOST.url + 'get-all-images').then(function (payload) {
                    self.images = payload.data;
                },function (err) {
                    console.alert(err);
                });
            };
        });

}());