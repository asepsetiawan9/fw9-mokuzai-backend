const auth = require('express').Router();
const authController = require('../controllers/auth_customer');
const { body } = require('express-validator');
const bcrypt = require('bcrypt');
// hahahahahah

const userValidation = [
  body('email').isEmail().withMessage('Email format invalid'),
  body('password')
    .isLength({ min: 8 })
    .withMessage('password length min 8 character')
    .customSanitizer(async (val) => {
      const hash = await bcrypt.hash(val, 10);
      return hash;
    }),
];

console.log(authController.register);
auth.post('/register', ...userValidation, authController.register);
// auth.post("/login", authController.login);

module.exports = auth;
