/* global describe, it, before */
/* jshint expr:true */
'use strict';
var Item;
var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');

describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
      Item = require('../../app/models/item');
      done();
    });
  });
  describe('constructor', function(){
    it('should create an Item object', function(){
      var couch = new Item('couch', 'living', '10/02/1988', '2', '1100');

      expect(couch).to.be.instanceof(Item);
      expect(couch.name).to.equal('couch');
      expect(couch.room).to.equal('living');
      expect(couch.acquired).to.be.instanceof(Date);
      expect(couch.count).to.equal(2);
      expect(couch.cost).to.equal(1100);
    });
  });
  describe('#save', function(){
    it('should save an item into the mongo database', function(done){
      var couch = new Item('couch', 'living', '10/02/1988', '2', '1100');
      couch.save(function(){
        expect(couch._id).to.be.ok;
        done();
      });
    });
  });
});
