const response = require('../helpers/standardResponse');
const authModel = require('../models/auth');
const userModel = require('../models/users');
const profileModel = require('../models/profile');
const errResponse = require('../helpers/errorResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {APP_SECRET} = process.env;

exports.registerSeller = (req,res) => {
  authModel.createRegister(req.body,(err)=>{
    if(err){
      return errResponse(err,res);
    }
    return response(res,'Create Seller Success');
  });
};

exports.login = (req, res)=>{
  const {email, password} = req.body;
  authModel.getUserByEmail(email, (err, results) => {
    if(results.rows.length < 1){
      return response(res, 'User Not Found', null, null, 400);
    }
    const user = results.rows[0];
    const user_id =  results.rows[0].id;
    const roles =  results.rows[0].roles;
    console.log(user);
    bcrypt.compare(password, user.password)
      .then((cpRes)=>{
        if(cpRes){
          const token = jwt.sign({id: user.id}, APP_SECRET || 'D3f4uLt');
          return response(res, 'Login Success', {token, user_id, roles });
        }
        return response(res, 'Check your email and pasword', null, null, 400);

      })
      .catch((e) => {
        console.log(e);
        return response(res, 'Check your email and pasword', null, null, 400);
      });
  });
};


exports.register_costumer = (req, res) => {
  console.log(req.body);
  userModel.createUsers(req.body, (err, userResult) => {
    console.log('abc');
    if (err) {
      return errResponse(err, res);
    }

    profileModel.createProfileAfterRegister(userResult[0].id, (err, result) => {
      // return response(res, "Good Job", userResult);
      userModel.createCart(userResult[0].id, (err, result) => {
        return response(res, 'Create Costumer Success', userResult);
      });
    });
  });
};
