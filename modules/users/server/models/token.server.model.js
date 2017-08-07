'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Device Schema
 */
var TokenSchema = new Schema({
  created: {
    type: Date,
    default: Date.now()
  },
  code: {
    type: String,
    default: ''
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  status: {
    type: Boolean,
    default: false
  }
});

mongoose.model('Token', TokenSchema);
