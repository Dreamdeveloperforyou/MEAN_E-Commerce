const categoryController = require('../controllers/categoryController');
const categoryRoute = require('express').Router();

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

categoryRoute.post('/add-category',upload.single('category_image'),require('express').json(),categoryController.addCategory);
categoryRoute.get('/getCategoryTree',categoryController.getCategoryTree);
categoryRoute.get('/getSubCategories',categoryController.getSubCategory);
categoryRoute.get('/getCategories',categoryController.getCategories);
categoryRoute.post('/getCategoriesById',require('express').json(),categoryController.getCategoryById);

categoryRoute.post('/categoryById', require('express').json(), categoryController.categoryById);
categoryRoute.post('/updateCategory', upload.single('category_image'), require('express').json(), categoryController.updateCategory);
categoryRoute.post('/updateSubCategory', require('express').json(), categoryController.updateSubCategory);

module.exports = categoryRoute;
