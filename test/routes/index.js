const app = require('../..');
const helper = require("../helpers.js")

describe('Task API Routes', function() {

  // In this test it's expected a task list of two tasks
  describe('GET /users', function() {
      it('returns a list of users', function(done) {
          request.get('/users')
              .expect(200)
              .end(function(err, res) {
                done(err);
              });
      });
  });

  // Testing the save task expecting status 201 of success
  describe('POST /users', function() {
      it('saves a new users', function(done) {
          request.post('/users')
              .send({
                name: "Chris",
                age: 25,
                gender: "WOMAN"
              })
              .expect(200)
              .end(function(err, res) {
                  done(err);
              });
      });
  });

  // Here it'll be tested two behaviors when try to find a task by id
  describe('GET /users/:id', function() {
      // Testing how to find a task by id
      it('returns a user by id', function(done) {
          var user = app.db.get('users').first().value();
          request.get('/users/' + user.id)
              .expect(200)
              .end(function(err, res) {
                  done(err);
              });
      });

      // Testing the status 404 for task not found
      it('returns status 404 when id is not found', function(done) {
          request.get('/users/fakeId')
              .expect(404)
              .end(function(err, res) {
                  done(err);
              });
      });
  });

  // Testing how to update a task expecting status 201 of success
  describe('PUT /users/:id', function() {
      it('updates a user', function(done) {
          var user = app.db.get('users').first().value();
          request.put('/users/' + user.id)
              .send({
                name: "Kevin",
                age: 32,
                gender: "MAN"
              })
              .expect(200)
              .end(function(err, res) {
                  done(err);
              });
      });
      it('validate updated a user', function() {
            var user = app.db.get('users').first().value();
            //값을 판독
      });
  });

  // Testing how to delete a task expecting status 201 of success
  describe('DELETE /users/:id', function() {
      it('removes a user', function(done) {
          var user = app.db.get('users').first().value();
          request.del('/users/' + user.id)
              .expect(200)
              .end(function(err, res) {
                  done(err);
              });
      });
  });
});