const productController = require('../controllers/productController');
const productRoute = require('express').Router();
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

productRoute.post('/add-product', upload.single('product_image'), require('express').json(),productController.addProduct);
productRoute.get('/display-product', productController.getProducts);
productRoute.delete('/delete-product', productController.deleteProduct);
productRoute.post('/getProductByCatId', require('express').json(),productController.getProductsByCatId);

productRoute.post('/getProductByProductId', require('express').json(), productController.getProductsByProductId);
productRoute.post('/updateProduct', upload.single('product_image'), require('express').json(), productController.updateProduct);


module.exports = productRoute;

