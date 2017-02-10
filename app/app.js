angular
    .module('adminApp', ['ngMaterial', 'ngAnimate', 'ngRoute'])
    .config(function($qProvider, $mdThemingProvider, $mdIconProvider, $routeProvider){

        $qProvider.errorOnUnhandledRejections(false);

        $mdThemingProvider.theme('default')
            .primaryPalette('blue')
            .accentPalette('yellow')
            .warnPalette('red');

        $routeProvider
            .when('/admin',{
                templateUrl: 'src/pages/admin/view/galery.html',
                controller: 'AdminController',
                resolve: {
                    images: function(imagesApiService, $q){
                        var defered = $q.defer();
                        imagesApiService.getAllImages().then(function (payload) {
                            defered.resolve(payload.data);

                        },function (err) {
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
            console.log('Angular runs!');
    }