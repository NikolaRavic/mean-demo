(function(){

  angular
       .module('adminApp')
       .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope','allImages'];

  function AdminController($scope, allImages) {

      $scope.images = allImages;

    console.log($scope.images);
  }
})();
