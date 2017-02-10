(function(){
    'use strict';

    angular.module('adminApp')
        .service('imagesApiService', function ($http, LOCAL_HOST) {
            var self = this;
            self.images = [];

            this.getAllImages = function () {
                return $http.get(LOCAL_HOST.url + 'get-all-images');
            };


            this.deleteImage = function (image) {
                var params = {
                    params: {
                        image: image,
                    }
                };
                return $http.post(LOCAL_HOST.url + 'delete-image', params);
            }
        });

}());