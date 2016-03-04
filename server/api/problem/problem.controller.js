/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/problems              ->  index
 * POST    /api/problems              ->  create
 * GET     /api/problems/:id          ->  show
 * PUT     /api/problems/:id          ->  update
 * DELETE  /api/problems/:id          ->  destroy
 */

'use strict';

import _ from 'lodash';
import Problem from './problem.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(updated => {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Problems
export function index(req, res) {
  Problem.findAsync()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Problem from the DB
export function show(req, res) {
  Problem.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// // Creates a new Problem in the DB
// export function create(req, res) {
//   Problem.createAsync(req.body)
//     .then(respondWithResult(res, 201))
//     .catch(handleError(res));
// }
// Creates a new Problem in the DB
export function create(req, res) {
  console.log('problem.controller:create called with ', req.body);
  console.log('req.user:', req.user.email);
  // if (!req.user) {
  //   console.log('req has no user');
  //   return res.status(404).send('Please log in to add new problems.');
  // }
    return Problem.create({
      name: req.body.name,
      info: req.body.info,
      user: req.user
    }).then(function(savedProblem) {
      console.log('saved problem:', savedProblem);
    })
  .then(respondWithResult(res, 201))
  .catch(handleError(res));
}

// Updates an existing Problem in the DB
export function update(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Problem.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Problem from the DB
export function destroy(req, res) {
  Problem.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
