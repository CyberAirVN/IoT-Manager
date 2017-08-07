'use strict';

const jwt = require('jsonwebtoken'),
  fs = require('fs'),
  path = require('path'),
  privateKey = path.resolve('./config/certificate/private-key.pem'),
  publicKey = path.resolve('./config/certificate/public-key.pem');

exports.encode = function (data) {

  var token = jwt.sign(data, fs.readFileSync(privateKey), {
    algorithm: 'RS256'
  });
  return token;
};

exports.decode = function (token, callback) {
  if (!token) {
    callback(null);
  } else {
    jwt.verify(token, fs.readFileSync(publicKey), {
      algorithms: ['RS256']
    }, function (err, data) {
      if (err) {
        callback(null);
      } else {
        callback(data);
      }
    });
  }
};
