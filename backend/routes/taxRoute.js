const express = require('express');
const taxController = require('../controllers/taxController');
const taxRoutes = express.Router();

taxRoutes.route('/addTax').post(express.json(),taxController.addTax);
taxRoutes.route('/addAssignTax').post(express.json(),taxController.addAssignTax);
taxRoutes.route('/getTax').get(express.json(),taxController.getTax);


module.exports = taxRoutes;