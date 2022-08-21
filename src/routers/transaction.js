const transaction = require('express').Router();
const transactionController = require('../controllers/transaction');
const { body } = require('express-validator');

transaction.post('/', transactionController.addChart);
transaction.get('/:user_id', transactionController.getChartById);
// auth.post("/login", authController.login);

module.exports = transaction;
