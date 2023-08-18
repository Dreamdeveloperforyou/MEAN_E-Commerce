const variantAttributeRoutes = require('express').Router();
const variantAttributeController = require('../controllers/variantAttributeController');

// variantAttributeRoutes.post('/addAttribute',require('express').json(), variantAttributeController.addVariantAttribute);
variantAttributeRoutes.post('/addAttribute', require('express').json(), variantAttributeController.addVariantAttribute);
variantAttributeRoutes.post('/getAttributeByVariantId', require('express').json(), variantAttributeController.getAttributeByVariantId);
variantAttributeRoutes.post('/getAttributeById', require('express').json(), variantAttributeController.getAttributeById);
variantAttributeRoutes.post('/updateAttribute', require('express').json(), variantAttributeController.updateAttribute);

module.exports = variantAttributeRoutes;

