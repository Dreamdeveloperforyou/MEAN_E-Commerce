const cartRoutes = require('express').Router();
const cartController = require('../controllers/cartController');

cartRoutes.post('/addToCart',require('express').json(), cartController.addTocart);
cartRoutes.post('/getCart',require('express').json(), cartController.getCart);
cartRoutes.post('/increaseCart',require('express').json(), cartController.increaseCart);
cartRoutes.post('/decreaseCart',require('express').json(), cartController.decreaseCart);
cartRoutes.post('/removeCart',require('express').json(), cartController.removeCart);

module.exports = cartRoutes;
