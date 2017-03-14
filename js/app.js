Array.prototype.remove = function() {
   var what, a = arguments, L = a.length, ax;
   while (L && this.length) {
       what = a[--L];
       while ((ax = this.indexOf(what)) !== -1) {
           this.splice(ax, 1);
       }
   }
   return this;
};

Array.prototype.shuffle = function() {
   var input = this;
   for (var i = input.length-1; i >=0; i--) {

       var randomIndex = Math.floor(Math.random()*(i+1));
       var itemAtIndex = input[randomIndex];

       input[randomIndex] = input[i];
       input[i] = itemAtIndex;
   }
   return input;
};

/* setup your angular app here */
var app = angular.module("sorter", []);

// debug stuff to show the app is loading and fruit / veggies are available

app.controller("SortCtrl", ["$scope", function($scope){
  $scope.unsorted = fruits.concat(vegetables).shuffle();
  $scope.sortedFruits = [];
  $scope.sortedVeggies = [];
  $scope.wrongFruits =[];
  $scope.wrongVeggies = [];
  $scope.win = false;

  $scope.moveFruit = function(){
    $scope.sortedFruits.push($scope.unsorted[this.$index]);
    $scope.unsorted.splice(this.$index, 1);
    $scope.checkSort();
  };

  $scope.moveVeggie = function(){
    $scope.sortedVeggies.push($scope.unsorted[this.$index]);
    $scope.unsorted.splice(this.$index, 1);
    $scope.checkSort();
  };

  $scope.moveBackUnsortedFruit = function(){
    console.log(this.food);
    if($scope.wrongFruits.includes(this.food)){
        $scope.wrongFruits.remove(this.food);
    }

    $scope.unsorted.push($scope.sortedFruits[this.$index]);
    $scope.sortedFruits.splice(this.$index, 1);

  };

  $scope.moveBackUnsortedVeggie = function(){
    if($scope.wrongVeggies.includes(this.food)){
      $scope.wrongVeggies.remove(this.food);
    }

    $scope.unsorted.push($scope.sortedVeggies[this.$index]);
    $scope.sortedVeggies.splice(this.$index, 1);
  };

  $scope.checkSort = function(){
    if(!$scope.unsorted.length){
      $scope.sortedFruits.forEach(function(fruit){
        if(!correctFruits.includes(fruit)){
          console.log(fruit, "at index", $scope.sortedFruits.indexOf(fruit), "is actually a vegetable");
          $scope.wrongFruits.push(fruit);
        }
      });
      $scope.sortedVeggies.forEach(function(veggie){
        if(!correctVegetables.includes(veggie)){
          console.log(veggie, "at index", $scope.sortedVeggies.indexOf(veggie), "is actually a fruit");
          $scope.wrongVeggies.push(veggie);
        }
      });

      if(!$scope.wrongFruits.length && !$scope.wrongVeggies.length){
        $scope.win = true;
      }
    }
  };


}]);
