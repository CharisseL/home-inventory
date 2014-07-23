'use strict';

//var request = require('request');
var cItem = global.mongodb.collection('items');

function Item(name, room, acquired, count, cost){
  this.name = name;
  this.room = room;
  this.acquired = new Date(acquired);
  this.count = parseFloat(count);
  this.cost = parseFloat(cost);
}

Item.prototype.save = function(cb){
  cItem.save(this, function(err, obj){
     cb();
  });
};

Item.find = function(query, cb){
  
  cItem.find(query).toArray(function(err, items){  //database is calling 
    console.log(items);
    cb(items);                                //the function
  });
};

module.exports = Item;

