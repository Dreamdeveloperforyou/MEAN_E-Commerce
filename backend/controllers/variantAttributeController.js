const variantAttribute = require('../models/variantAttributeModel');

module.exports.addVariantAttribute = async (req, res) => {
    try {
        const { variant_id, size } = req.body;

        if (!variant_id || !size ) {
            return res.status(400).json({ message: 'all fields are required', success: false });
        }
        const newAttribute = new variantAttribute({
            variant_id,
            size           
        });
        await newAttribute.save();
        res.status(200).json({ message: 'Attribute added', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
} 


module.exports.getAttributeByVariantId = async (req, res) => {
    try {
        const Attribute = await variantAttribute.find({ variant_id: req.body._id });
        res.status(200).json({ message: 'Attribute data', success: true, data: Attribute });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}

module.exports.getAttributeById = async (req, res) => {
    try {
        const Attribute = await variantAttribute.findOne({ _id: req.body._id });
        res.status(200).json({ message: 'Attribute data', success: true, data: Attribute });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}

module.exports.updateAttribute = async (req, res) => {
    try {
        await variantAttribute.updateOne({ _id: req.body._id }, { $set: req.body });
        res.status(200).json({ message: 'Attribute updated', success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}
 
