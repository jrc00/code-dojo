'use strict';

var app = require('../..');
import request from 'supertest';

var newProblem;

describe('Problem API:', function() {

  describe('GET /api/problems', function() {
    var problems;

    beforeEach(function(done) {
      request(app)
        .get('/api/problems')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          problems = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      problems.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/problems', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/problems')
        .send({
          name: 'New Problem',
          info: 'This is the brand new problem!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newProblem = res.body;
          done();
        });
    });

    it('should respond with the newly created problem', function() {
      newProblem.name.should.equal('New Problem');
      newProblem.info.should.equal('This is the brand new problem!!!');
    });

  });

  describe('GET /api/problems/:id', function() {
    var problem;

    beforeEach(function(done) {
      request(app)
        .get('/api/problems/' + newProblem._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          problem = res.body;
          done();
        });
    });

    afterEach(function() {
      problem = {};
    });

    it('should respond with the requested problem', function() {
      problem.name.should.equal('New Problem');
      problem.info.should.equal('This is the brand new problem!!!');
    });

  });

  describe('PUT /api/problems/:id', function() {
    var updatedProblem;

    beforeEach(function(done) {
      request(app)
        .put('/api/problems/' + newProblem._id)
        .send({
          name: 'Updated Problem',
          info: 'This is the updated problem!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedProblem = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedProblem = {};
    });

    it('should respond with the updated problem', function() {
      updatedProblem.name.should.equal('Updated Problem');
      updatedProblem.info.should.equal('This is the updated problem!!!');
    });

  });

  describe('DELETE /api/problems/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/problems/' + newProblem._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when problem does not exist', function(done) {
      request(app)
        .delete('/api/problems/' + newProblem._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);problem
          }
          done();
        });
    });

  });

});
