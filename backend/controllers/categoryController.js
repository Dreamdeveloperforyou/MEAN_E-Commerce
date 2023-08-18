const Category = require('../models/categoryModel');

module.exports.addCategory = async (req, res) => {
    try {
        // console.log('hdgfjdfh',req.body);
        // console.log('65454654',req.file);
        const { name, parent_id } = req.body;
        if (!name) {
            return res.status(200).send({ message: 'all fields are required' });
        }
        if (req.file) {
            var newCategory = new Category({ name, parent_id, category_image: req.file.originalname });
        }
        else {
            var newCategory = new Category({ name, parent_id });
        }
        await newCategory.save();
        res.status(200).send({ success: true, data: newCategory });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};
 

module.exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ parent_id: { $eq: null } });
        if (!categories.length > 0) {
            // res.status(200).json({ message: 'categories not found', success: false, data: categories,ip:ip });
            res.status(200).json({ message: 'categories not found', success: false, data: categories });
        }
        res.status(200).json({ message: 'categories data', success: true, data: categories });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'server error' });
    }
};


module.exports.getCategoryTree = async (req, res) => {
    async function getCategoriesTree() {
        const categories = await Category.find();
        const categoryMap = {};
        // Create a map of categories based on their IDs
        categories.forEach(category => {
            categoryMap[category._id] = { ...category.toJSON(), children: [] };
        });

        // Build the tree structure by iterating over the categories and
        // adding each one as a child of its parent (if it has one)
        categories.forEach(category => {
            const parentId = category.parent_id;
            if (parentId) {
                const parent = categoryMap[parentId];
                parent.children.push(categoryMap[category._id]);
            }
        });

        // Find the top-level categories (i.e. those with no parent) and
        // return them as an array
        const roots = [];
        categories.forEach(category => {
            if (!category.parent_id) {
                roots.push(categoryMap[category._id]);
            }
        });
        return roots;
    }
    try {
        const categories = await getCategoriesTree();
        res.status(200).send({ success: true, data: categories });
    } catch (error) {
        res.status(500).send({ success: false, message: error.message });
    }
};


module.exports.getSubCategory = async (req, res) => {
    try {
        const subCategories = await Category.find({ parent_id: { $ne: null } });
        return res.status(200).send({ success: true, data: subCategories });
    } catch (error) {
        console.log(error)
       return res.status(500).send({ success: false, message: error.message });
    }
};


module.exports.getCategoryById = async (req, res) => {
    try {
        const { parent_id } = req.body;
        if (!parent_id) {
            return res.status(200).json({ success: false, message: 'category id not found' });
        }
        const categories = await Category.find({ parent_id });
        res.status(200).json({ success: true, data: categories });
    } catch (error) {
        console.log(error);
       return res.status(500).json({ success: false, message: 'server error' });
    }
};

module.exports.categoryById = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.body.categoryId });
    return res.status(200).send({ success: true, data: category });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};


module.exports.updateCategory = async (req, res) => {
    try {
        if (!req.body._id || !req.body.name) {
            return res.status(200).send({ success: false, message: 'all fields required' });
        }
        if (req.file) {
            await Category.updateOne({ _id: req.body._id }, { $set: { name: req.body.name, category_image: req.file.originalname } });
        } else {
            await Category.updateOne({ _id: req.body._id }, { $set: req.body });
        }
        return res.status(200).send({ success: true, message: 'data updated' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: 'server error' });
    }
};

module.exports.updateSubCategory = async (req, res) => {
  try {
    if (!req.body._id || !req.body.name) {
      return res
        .status(200)
        .send({ success: false, message: "all fields required" });
    }
    await Category.updateOne(
      { _id: req.body._id },
      { $set: { name: req.body.name } }
    );
    return res.status(200).send({ success: true, message: "data updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "server error" });
  }
};
