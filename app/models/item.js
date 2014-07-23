'use strict';

//var request = require('request');

function Item(name, room, acquired, count, cost){
  this.name = name;
  this.room = room;
  this.acquired = new Date(acquired);
  this.count = parseFloat(count);
  this.cost = parseFloat(cost);
}

module.exports = Item;
