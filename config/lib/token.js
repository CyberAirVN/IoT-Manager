'use strict';

// const jwt = require('jsonwebtoken'),
//   fs = require('fs'),
//   path = require('path'),
//   privateKey = path.resolve('./config/certificate/private-key.pem'),
//   publicKey = path.resolve('./config/certificate/public-key.pem');
//
// exports.encode = function (data) {
//
//   var token = jwt.sign(data, fs.readFileSync(privateKey), {
//     algorithm: 'RS256'
//   });
//   return token;
// };
//
// exports.decode = function (token, callback) {
//   if (!token) {
//     callback(null);
//   } else {
//     jwt.verify(token, fs.readFileSync(publicKey), {
//       algorithms: ['RS256']
//     }, function (err, data) {
//       if (err) {
//         callback(null);
//       } else {
//         callback(data);
//       }
//     });
//   }
// };

var crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = 'jsh9dUG52s18';

exports.encode = function(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
};

exports.decode = function(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
};
