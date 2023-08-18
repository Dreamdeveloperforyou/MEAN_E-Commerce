const wishListRoute = require('express').Router();
const wishListController = require('../controllers/wishlistController');

wishListRoute.post('/addWishlist',require('express').json(), wishListController.addWishList);
wishListRoute.post('/getWishlist',require('express').json(), wishListController.getWishlist);
wishListRoute.post('/removeWishlist',require('express').json(), wishListController.removeWishlist);


module.exports = wishListRoute;
 