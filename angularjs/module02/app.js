(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var list = this;

  list.items = ShoppingListCheckOffService.getItemsToBuy();

  list.buyItem = function (itemIndex) {
    ShoppingListCheckOffService.buy(itemIndex);
  }
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var list = this;

  list.items = ShoppingListCheckOffService.getItemsBought();
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var to_buy = [
    {name: "cookies", quantity: 10},
    {name: "soda", quantity: 15},
    {name: "soap", quantity: 2},
    {name: "jeans", quantity: 1},
    {name: "bread", quantity: 2}
  ];

  var bought = [];

  service.buy = function (itemIndex) {
    var item = to_buy[itemIndex];
    to_buy.splice(itemIndex, 1);
    bought.push(item);
  };

  service.getItemsToBuy = function () {
    return to_buy;
  };

  service.getItemsBought = function () {
    return bought;
  }
}

})();
