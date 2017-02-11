angular
    .module('adminApp', ['ngMaterial', 'ngAnimate', 'ngRoute', 'ngAnimate'])
    .config(function ($qProvider, $mdThemingProvider, $mdIconProvider, $routeProvider) {

        $qProvider.errorOnUnhandledRejections(false);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('yellow')
            .warnPalette('red');

        $routeProvider
            .when('/admin', {
                templateUrl: 'src/pages/admin/view/galery.html',
                controller: 'AdminController',
                resolve: {
                    //resolve is used to fetch all needed data from DB before controller is loaded
                    images: function (imagesApiService, $q) {

                        var defered = $q.defer();

                        imagesApiService.getAllImages().then(function (payload) {
                            defered.resolve(payload.data);

                        }, function (err) {
                            defered.reject(err);
                        });
                        return defered.promise;
                    }
                }
            }).otherwise({
            redirectTo: '/admin'
        });

    }).run(run);

run.$inject = [];

function run() {
    console.log('Greetings from MEAN.js gallery demo app!');
}