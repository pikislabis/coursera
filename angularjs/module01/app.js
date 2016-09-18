(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController);

MsgController.$inject = ['$scope'];
function MsgController($scope) {
  $scope.meal = "";
  $scope.message = "";

  $scope.checkMeal = function () {
    var meals_array = $scope.meal.split(",");
    var valid_meals = 0;

    for(var i = 0, l = meals_array.length; i < l; i++){
      if(meals_array[i].trim() !== ""){
        valid_meals += 1;
      }
    }

    if(valid_meals === 0){
      $scope.message = "Please enter data first";
    }else if(valid_meals > 3){
      $scope.message = "Too much!";
    } else{
      $scope.message = "Enjoy!";
    }
  };
}

})();
