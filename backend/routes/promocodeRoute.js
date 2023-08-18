const express = require('express');
const promocodeController = require('../controllers/promocodeController');
const promoCodeRoutes = express.Router();

promoCodeRoutes.route('/savePromocode').post(express.json(),promocodeController.savePromocode);
promoCodeRoutes.route('/getPromocodes').get(express.json(),promocodeController.getPromocodes);
promoCodeRoutes.route('/assignPromocode').post(express.json(),promocodeController.assignPromocodes);
promoCodeRoutes.route('/applyPromocode').post(express.json(),promocodeController.applyPromocode);
// promoCodeRoutes.route('/deletePromocode').delete(express.json(),promocodeController.deletePromocode);

module.exports = promoCodeRoutes;