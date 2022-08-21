const userModel = require('../models/users');
const profileModel = require('../models/profile');
const response = require('../helpers/standardResponse');
const errorResponse = require('../helpers/errorResponse');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// console.log("b");

exports.register = (req, res) => {
  console.log(req.body);
  userModel.createUsers(req.body, (err, userResult) => {
    console.log('abc');
    if (err) {
      return errorResponse(err, res);
    }

    profileModel.createProfileAfterRegister(userResult[0].id, (err, result) => {
      // return response(res, "Good Job", userResult);
      userModel.createCart(userResult[0].id, (err, result) => {
        return response(res, 'my pleasure', userResult);
      });
    });
  });
};
