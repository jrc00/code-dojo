'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var problemCtrlStub = {
  index: 'problemCtrl.index',
  show: 'problemCtrl.show',
  create: 'problemCtrl.create',
  update: 'problemCtrl.update',
  destroy: 'problemCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var problemIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './problem.controller': problemCtrlStub
});

describe('Problem API Router:', function() {

  it('should return an express router instance', function() {
    problemIndex.should.equal(routerStub);
  });

  describe('GET /api/problems', function() {

    it('should route to problem.controller.index', function() {
      routerStub.get
        .withArgs('/', 'problemCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/problems/:id', function() {

    it('should route to problem.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'problemCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/problems', function() {

    it('should route to problem.controller.create', function() {
      routerStub.post
        .withArgs('/', 'problemCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/problems/:id', function() {

    it('should route to problem.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'problemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/problems/:id', function() {

    it('should route to problem.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'problemCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/problems/:id', function() {

    it('should route to problem.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'problemCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
