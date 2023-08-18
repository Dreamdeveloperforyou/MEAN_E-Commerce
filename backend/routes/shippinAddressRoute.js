const shippingAddressRoutes = require('express').Router();
const shippingAddressController = require("../controllers/shippingAddressController");

shippingAddressRoutes.route('/addShippingAddress').post(require('express').json(),shippingAddressController.addShippingAddress);
shippingAddressRoutes.route('/getShippingAddress').post(require('express').json(),shippingAddressController.getShippingAddress);

shippingAddressRoutes.route('/getShippingAddressById').post(require('express').json(), shippingAddressController.getShippingAddressById);
shippingAddressRoutes.route('/updateShippingAddress').post(require('express').json(), shippingAddressController.updateShippingAddress);
shippingAddressRoutes.route('/deleteShippingAddress').delete(require('express').json(), shippingAddressController.deleteShippingAddress);
shippingAddressRoutes.route('/setDefaultShippingAddress').post(require('express').json(), shippingAddressController.setDefaultShippingAddress);
shippingAddressRoutes.route('/getdefaultAddress').post(require('express').json(), shippingAddressController.getDefaultAddress);


module.exports = shippingAddressRoutes;
 