/* global describe, it, before, beforeEach */
/* jshint expr:true */
'use strict';

var Item;
var Mongo = require('mongodb');
var expect = require('chai').expect;
var connect = require('../../app/lib/mongodb');

describe('Item', function(){
  before(function(done){
    connect('home-inventory-test', function(){
      Item = require('../../app/models/item');
      done();
    });
  });


    beforeEach(function(done){
      global.mongodb.collection('items').remove(function(){
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
        expect(couch._id).to.be.instanceof(Mongo.ObjectID);
        done();
      });
    });
  });

  describe('.find', function(done){
    it('should find specific from the mongo database', function(done){
      var couch = new Item('couch', 'living', '10/02/1988', '2', '1100');
      var chair = new Item('chair', 'living', '11/03/1989', '3', '1200');
      var bed = new Item('bed', 'bedroom', '12/08/1988', '4', '1700');

      couch.save(function(){
        chair.save(function(){
          bed.save(function(){
            Item.find({name: 'chair'}, function(items){
              expect(items).to.have.length(1);
              expect(items[0].name).to.equal('chair');
              done();
            });
          });
        });
      });
    });
  });
});

