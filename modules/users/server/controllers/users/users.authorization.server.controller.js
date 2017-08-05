'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  crypto = require('crypto');

/**
 * User middleware
 */
exports.userByID = function (req, res, next, id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'User is invalid'
    });
  }

  User.findOne({
    _id: id
  }).exec(function (err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      return next(new Error('Failed to load User ' + id));
    }

    req.profile = user;
    next();
  });
};
/**
 * Get token
 */
exports.getToken = function (req, res) {
  if (req.session.socketToken) {
    res.json(req.session.socketToken);
  } else {
    crypto.randomBytes(18, function (err, buffer) {
      var token = buffer.toString('hex');
      req.session.socketToken = token;
      res.json(token);
    });
  }
};
