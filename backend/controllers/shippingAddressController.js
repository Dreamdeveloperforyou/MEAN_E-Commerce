const ShippingAddress = require('../models/shippingAddressModel');

module.exports.addShippingAddress = async (req, res) => {
    try {
        const { user, country, state, city, street, pincode, phone_number, type } = req.body;
        if (!user || !country || !state || !city || !street || !pincode || !phone_number ||!type) {
            return res.status(200).json({ message: 'all fields required' });
        }

        const newAddress = new ShippingAddress({
            user,
            country,
            state,
            city,
            street,
            pincode,
            phone_number,
            type
        });
        newAddress.save();
        res.status(200).json({ message: 'address saved', data: newAddress });
    } catch (error) {
        console.log(error);
        res.status(200).json({ message: 'server error' });
    }
}

module.exports.getShippingAddress = async (req, res) => {
    try {
        if (!req.body.user) {
            return res.status(200).json({ message: 'user required' });
        }
        const Address = await ShippingAddress.find({ user: req.body.user }); 
        res.status(200).json({ message: 'address detail', data: Address });
    } catch (error) {
        console.log(error); 
        res.status(200).json({ message: 'server error' });
    }
}

  
module.exports.getShippingAddressById = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(200).json({ message: '_id required' });
        }
        const Address = await ShippingAddress.findOne({ _id: req.body._id });
        return res.status(200).json({ message: 'address detail', data: Address });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'server error' });
    }
}

module.exports.updateShippingAddress = async (req, res) => {
    try {
        const { _id, user, country, state, city, street, pincode, phone_number, type } = req.body;
        if (!_id || !user || !country || !state || !city || !street || !pincode || !phone_number || !type) {
            return res.status(200).json({ message: 'all fields required' });
        }
        await ShippingAddress.updateOne({ _id }, { $set: req.body });
        res.status(200).json({ message: 'data updated' });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'server error' });
    }
}

module.exports.deleteShippingAddress = async (req, res) => {
    try {
        const { _id } = req.query;
        if (!_id) {
            return res.status(200).json({ message: '_id required' });
        }
        await ShippingAddress.deleteOne({ _id });
        res.status(200).json({ message: 'data deleted' });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'server error' });
    }
}

module.exports.setDefaultShippingAddress = async (req, res) => {
    try {
        const { user, _id } = req.body;
        console.log('body',req.body);
        if (!user || !_id) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const defaultAddress = await ShippingAddress.find({ $and: [{ user: user }, { default: true }] });
        console.log('deafult', defaultAddress);
        if (defaultAddress.length > 0) {
            await ShippingAddress.updateOne({ _id: defaultAddress[0]._id }, { $set: { default: false } });
            await ShippingAddress.updateOne({ _id }, { $set: { default: true } });
        } else {
            await ShippingAddress.updateOne({ _id }, { $set: { default: true } });
        }
        res.status(200).json({ message: 'data updated' });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'server error' });
    }
}

module.exports.getDefaultAddress = async (req, res) => {
    try {
        if (!req.body.user) {
            return res.status(200).json({ message: 'user required' });
        }
        const Address = await ShippingAddress.find({ $and:[{user:req.body.user},{default:true}]});
        return res.status(200).json({ message: 'address detail', data: Address });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: 'server error' });
    }
}







