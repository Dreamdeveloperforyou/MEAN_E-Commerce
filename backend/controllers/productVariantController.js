const Variant = require("../models/productVariantModel");
const variantAttribute = require('../models/variantAttributeModel');
const AssignTax = require('../models/assignTax');
const Tax = require('../models/taxModel');

module.exports.addVariant = async (req, res) => {
    try {
        const { name, product_id, price, quantity, colour } = req.body;
        console.log('body', req.body);
        console.log('files', req.files);
        if (!name || !product_id || !price || !quantity || !colour) {
            return res.status(400).json({ message: 'all fields are required', success: false });
        }

        let productImages = [];
        req.files.variant_image.map((image) => {
            productImages.push(image.originalname)
        })
        const newVariant = new Variant({
            name,
            product_id,
            price,
            quantity,
            colour,
            colour_image: req.files.colour_image[0].originalname,
            variant_image: productImages
        })
        await newVariant.save();
        res.status(200).json({ message: 'variant added', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};

module.exports.getVariants = async (req, res) => {
    try {
        const variants = await Variant.find();
        if (!variants.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variants });
        }
        res.status(201).json({ message: 'Variants data', data: variants });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};



module.exports.getVariantById = async (req, res) => {
    try {
        const variants = await Variant.findOne({ _id: req.body._id });
        if (!variants.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variants });
        }
        res.status(201).json({ message: 'Variants data', data: variants });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};

module.exports.getVariantByProductId = async (req, res) => {
    try {
        var tax;
        const variants = await Variant.find({ product_id: req.body.product_id });
        if (!variants.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variants });
        }
        // res.status(201).json({ message: 'Variants data', data: variants });

        const taxes = await AssignTax.find({ product: req.body.product_id });
        if (taxes.length > 0) {
            tax = await Tax.findOne({ _id: taxes[0].tax });
        }
        if (tax) {
            return res.status(201).json({ message: 'Variants data', data: variants, tax: tax });
        } else {
            return res.status(201).json({ message: 'Variants data', data: variants, tax: { tax: 0 } });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};

/**
module.exports.getVariantByProductId = async (req, res) => {
    try {
        var tax;
        var variants = await Variant.find({ product_id: req.body.product_id });
        if (!variants.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variants });
        }

        const taxes = await AssignTax.find({ product: req.body.product_id });
        if (taxes.length > 0) {
            tax = await Tax.findOne({ _id: taxes[0].tax });
        }
        if (tax) {
            return res.status(201).json({ message: 'Variants data', data: variants, tax: tax });
        } else {
            return res.status(201).json({ message: 'Variants data', data: variants, tax: {tax:0} });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};
 */

module.exports.getVariantColours = async (req, res) => {
    try {
        const variantColours = await Variant.find({ product_id: req.body.id }, { colour_image: 1, product_id: 1 });
        if (!variantColours.length > 0) {
            return res.status(201).json({ message: 'Variant not found', data: variantColours });
        }
        res.status(201).json({ message: 'Variants data', data: variantColours });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
};


module.exports.getVariantSize = async (req, res) => {
    try {
        const attributes = await variantAttribute.find({ variant_id: req.body.id });
        if (!attributes.length > 0) {
            return res.status(201).json({ message: 'attributes not found', data: attributes });
        }
        res.status(201).json({ message: 'Attributes data', data: attributes });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}

module.exports.updateVariant = async (req, res) => {
    try {
        if (!req.body.name || !req.body.product_id || !req.body.price || !req.body.quantity || !req.body.colour) {
            return res.status(200).json({ message: "all fields required", success: false });
        }
        if (req.files.colour_image || req.files.variant_image) {
            if (req.files.colour_image && req.files.variant_image) {
                let productImages = [];
                req.files.variant_image.map((image) => {
                    productImages.push(image.originalname);
                });
                await Variant.updateOne({ _id: req.body._id },
                    {
                        $set: {
                            name: req.body.name, product_id: req.body.product_id, price: req.body.price, quantity: req.body.quantity,
                            colour: req.body.colour, colour_image: req.files.colour_image[0].originalname, variant_image: productImages
                        }
                    });
            } else if (req.files.colour_image && !req.files.variant_image) {
                req.body.variant_image = req.body.variant_image.split(',');
                await Variant.updateOne({ _id: req.body._id },
                    {
                        $set: {
                            name: req.body.name, product_id: req.body.product_id, price: req.body.price, quantity: req.body.quantity, colour: req.body.colour,
                            colour_image: req.files.colour_image[0].originalname, variant_image: req.body.variant_image
                        }
                    });
            } else {
                let productImages = [];
                req.files.variant_image.map((image) => {
                    productImages.push(image.originalname);
                });
                await Variant.updateOne({ _id: req.body._id }, 
                    {
                        $set: {
                            name: req.body.name, product_id: req.body.product_id, price: req.body.price, variant_image: productImages,
                            quantity: req.body.quantity, colour: req.body.colour, colour_image: req.body.colour_image,
                        }
                    });
            }
        } else {
            req.body.variant_image = req.body.variant_image.split(',');
            await Variant.updateOne({ _id: req.body._id }, { $set: req.body });
        }
        res.status(200).json({ message: "data updated", success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
};


module.exports.searchVariant = async (req, res) => {
    try {
        const searchQuery = req.body.searchQuery;
        if (!searchQuery) {
            return res.status(200).json({ message: 'search required' });
        }
        const searchResult = await Variant.find({
            $or: [{ name: { $regex: searchQuery, $options: 'i' } }, { colour: { $regex: searchQuery, $options: 'i' } }]
        });
        return res.status(200).json({ message: 'search result', data: searchResult });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}