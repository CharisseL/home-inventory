/* global describe, it */
/* jshint expr:true */
'use strict';
var Item = require('../../app/models/item');
var expect = require('chai').expect;

describe('Item', function(){
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
});
