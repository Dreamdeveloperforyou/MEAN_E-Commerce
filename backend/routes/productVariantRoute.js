const variantController = require('../controllers/productVariantController');
const variantRoute = require('express').Router();

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

variantRoute.post('/addVariant', upload.fields([{ name: 'variant_image' }, { name: 'colour_image' }]), require('express').json(), variantController.addVariant);
variantRoute.get('/getVariants', require('express').json(), variantController.getVariants);
variantRoute.post('/getVariantById', require('express').json(), variantController.getVariantById);
variantRoute.post('/getVariantByProductId', require('express').json(), variantController.getVariantByProductId);
variantRoute.post('/getVariantColours', require('express').json(), variantController.getVariantColours);
variantRoute.post('/getVariantSize', require('express').json(), variantController.getVariantSize); 
// variantRoute.post('/searchVariant', require('express').json(), variantController.searchVariant);
variantRoute.post('/updateVariant', upload.fields([{ name: 'variant_image' }, { name: 'colour_image' }]), require('express').json(), variantController.updateVariant);

module.exports = variantRoute; 

