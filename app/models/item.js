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

Item.prototype.value = function(){
  return this.cost * this.count;
};

Item.find = function(query, cb){
    cItem.find(query).toArray(function(err, items){  //database is calling 
    console.log(items);
    cb(items);                                //the function
  });
};

Item.value = function(query, cb){
  Item.find(query, function(items){
    var val = 0;
    for(var i = 0; i < items.length; i++){
      val += (items[i].count * items[i].cost);
    }
    cb(val);
  });
};

module.exports = Item;

