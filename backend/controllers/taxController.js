const Tax = require('../models/taxModel');
const AssignTax = require('../models/assignTax');

module.exports.addTax = async (req, res) => {
    try {
        const { title, tax } = req.body;
        if (!title || !tax) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const newTax = new Tax({
            title,
            tax
        });
        newTax.save();
        return res.status(200).json({ message: 'tax added.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports.getTax = async (req, res) => { 
    try {
        const taxes = await Tax.find();
        return res.status(200).json({ message: 'taxes.', data: taxes });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}

module.exports.addAssignTax = async (req, res) => {
    try {
        const { product, tax } = req.body;
        if (!product || !tax) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const newAssignTax = new AssignTax({
            product,
            tax
        });
        newAssignTax.save();
        return res.status(200).json({ message: 'tax assigned.' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal server error.' });
    }
}
