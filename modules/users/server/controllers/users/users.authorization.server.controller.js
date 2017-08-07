'use strict';

/**
 * Module dependencies
 */
var _ = require('lodash'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Token = mongoose.model('Token'),
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
 * User token
 */
exports.getToken = function (req, res) {
  if (req.session.socketToken) {
    res.json(req.session.socketToken);
  } else {
    crypto.randomBytes(18, (err, buffer) => {
      req.session.socketToken = buffer.toString('hex');
      res.json(req.session.socketToken);
    });
  }
};
/**
 * Socket token
 */
exports.socketToken = function (req, res) {
  crypto.randomBytes(21, (err, buffer) => {
    var token = new Token();
    token.code = buffer.toString('hex');
    token.user = req.user._id;
    token.save(err => {
      res.json(token.code);
    });
  });
};
