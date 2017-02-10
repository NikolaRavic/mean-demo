(function(){

  angular
       .module('adminApp')
       .controller('AdminController', AdminController);

  AdminController.$inject = ['$scope','$timeout','images', 'eventBus','$mdDialog', '$mdToast'];

  function AdminController($scope, $timeout, images, eventBus, $mdDialog, $mdToast) {

      $scope.images = images;
      $scope.max = 1;
      $scope.pointsFilter = [0];
      $scope.disableFilter = false;
      $scope.selectedValue ='';
      $scope.checked = false;

      // $scope.images.forEach(function (image) {
      //     if($scope.pointsFilter.indexOf(image.points) === -1){
      //         $scope.pointsFilter.push(image.points);
      //     }
      // });

      eventBus.onEvent('imageIndex', function (event, index) {
          //TODO
      }, $scope);

      $scope.delete = function ($event, image, index) {

          var dialog = $mdDialog.confirm(
              {
                  title: 'Would you like to delete this image?',
                  textContent: 'The image is not deleted permanently, it is moved to archive folder.',
                  clickOutsideToClose:true,
                  targetEvent: $event,
                  hasBackdrop:false,
                  ok: 'Delete',
                  cancel: 'Cancel'
              });


          $mdDialog.show(dialog).then(function () {

              imagesApiService.deleteImage(image, index).then(function (payload) {

                  $scope.images.splice(index,1);

                  $scope.images.push(payload.data)
                  //
                  //     ._id = payload.data._id;
                  // $scope.images[index].folder = payload.data._id;
                  // $scope.images[index].archive = payload.data.archive;
                  // $scope.images[index].points = payload.data.points;

                  // eventBus.emit('updateSrc', payload.data.archive);

                  // for(var i = 0; i < index; i++){
                  //     if($scope.images[i].archive===""){
                  //         $scope.images[i].points++;
                  //     }
                  // }
                  // $scope.images[index].points = 0;
                  // $scope.images[index].archive = payload;

                  console.log(payload.data.archive);

              }, function (err) {
                      console.alert(err);
              });

          });

      };

      $scope.oneAndMore=function (property, value) {
          console.log($scope.checked);

          return function (item) {
              return item[property] > value;
          }
      };

      $scope.equalPoint = function (property, value) {
          return function (item) {
              return item[property] == value;
          }
      };

      $scope.selectFilter = function (selected) {
          console.log(selected);
          switch(selected){
              case -2:
                  $scope.disableFilter = true;
                  break;
              case -1:
                  $scope.flag = true;
                  $scope.disableFilter = false;
                  break;
              default:
                  $scope.flag2 = true;
                  $scope.disableFilter = false;
                  break;

          }
      };
      $scope.disableSearch = function (data) {
          if(data){
              $scope.disableSe = true;
          }
      };
  }
})();
