'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));

var ProblemSchema = new mongoose.Schema({
  name: String,
  info: String,
  completed: Boolean,
  user: { type: mongoose.Schema.ObjectId, ref: 'User' }
});

export default mongoose.model('Problem', ProblemSchema);
