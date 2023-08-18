const express = require('express');
const orderRoute = require('express').Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleWare/authMiddleWare');


// orderRoute.route('/saveOrder').post(require('express').json(),orderController.saveOrder);
orderRoute.route('/saveOrder').post(require('express').json(), orderController.saveOrder);
orderRoute.route('/getOrder').post(express.json(), orderController.getOrderById);



module.exports = orderRoute;