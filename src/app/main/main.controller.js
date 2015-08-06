'use strict';

angular.module('mobile-boilerplate')
.controller('MainCtrl', ['$scope', 'scala', function ($scope, scala) {
//TODO remove me
  this.fireIt = function() {
    scala.interface.broadcast({ name: 'control', payload: { type: 'button' }});
  };

  var self = this;
  self.colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'deepBlue', 'lightPurple'];
  self.tiles = [];
  self.counter = 0;

  scala.location.on('enter', function(payload) {
    var it = {};
    it.icon = payload.event.type === 'beacon' ? 'img/ic_bluetooth_searching_black_24px.svg' : 'img/ic_gps_fixed_black_24px.svg';
    it.background = self.colors[self.counter++ % self.colors.length];
    it.title = payload.location;
    it.span = { row : 1, col : 1 };

    self.tiles.push(it);
    $scope.$apply();

    console.log('added ' + payload.location);
  });

  scala.location.on('exit', function(payload) {

    for (var i = 0; i < self.tiles.length; i++) {
      if (self.tiles[i].title === payload.location) {
        self.tiles.splice(i, 1);
        $scope.$apply();
        break;
      }
    }

    console.log('removed ' + payload.location);
  });

}]);
