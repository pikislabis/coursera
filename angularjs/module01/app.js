(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.meal = "";
  $scope.message = "";
  $scope.font_color = "red";

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
      $scope.font_color = "green";
    } else{
      $scope.message = "Enjoy!";
      $scope.font_color = "green";
    }
  };
}

})();
