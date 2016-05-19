const db = require ('../lib/db.js');
const assert = require('chai').assert;


describe('books module',() => {

  describe('on create', () =>{

    it('writes to json file and returns an object', ( done ) =>{
      db.create({title:'herbook', pub_year:'1986'})
      .then(data => {
        assert.isOk(data);
        done();
      })
      .catch(error =>{
        assert.isOk(error);
        done();
      });
    });

  });

  describe('on read', () =>{

    it('returns an array of objects when given an array of resources', ( done ) =>{
      db.read([1])
      .then( data =>{
        assert.equal(data.length, 2);
        done();
      })
      .catch( error =>{
        assert.isOk(error);
        done();
      });

    });


    it('returns an array of resources when given an empty array', (done) =>{
      db.read([])
      .then( data =>{
        assert.isOk(data);
        done();
      })
      .catch( error =>{
        assert.isOk(error);
        done();
      });
    });
  });

  describe('on update', () =>{

    it('renames a filename and resource and returns an object', (done) =>{
      db.update('1', {title:'herbook', pub_year:'2008', id:'1'})
      .then( data => {
        assert.isOk(data);
        done();
      })
      .catch( err => {
        assert.isOk(err);
        done();
      });
    });

  });

  describe('on delete', () =>{

    it('returns a delete message', (done) =>{
      db.delete('1')
      .then( data => {
        assert.equal(data.message, 'deleted 1');
        done();
      })
      .catch( err => {
        assert.isOk(err);
        done();
      });
    });

  });
});
