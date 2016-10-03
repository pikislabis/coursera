(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItemsDirective)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json");


function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&',
      showError: '<'
    },
    controller: NarrowItDownController,
    controllerAs: 'list',
    bindToController: true
  };

  return ddo;
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.foundItems = [];
  list.searchText = "";
  list.showError = false;

  list.search = function () {
    if(list.searchText){
      var promise = MenuSearchService.getMatchedMenuItems(list.searchText);

      promise.then(function (response) {
        list.foundItems = response;
        if(list.foundItems.length > 0){
          list.showError = false;
        }else{
          list.showError = true;
        }
      });
    } else {
      list.foundItems = [];
      list.showError = true;
    }
  };

  list.removeItem = function (itemIndex) {
    list.foundItems.splice(itemIndex, 1);

    if(list.foundItems.length === 0){
      list.showError = true;
    }
  };
}

MenuSearchService.$inject = ['$http', 'ApiPath'];
function MenuSearchService($http, ApiPath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiPath)
    }).then(function(result){
      var foundItems = [];
      var menu_items = result.data.menu_items;
      for(var i = 0, l = menu_items.length; i < l; i++){
        if(menu_items[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
          foundItems.push(menu_items[i]);
        }
      }

      return foundItems;
    });
  };
}
})();
