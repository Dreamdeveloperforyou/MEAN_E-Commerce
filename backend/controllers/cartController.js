const Cart = require('../models/cart');
const Variant = require('../models/productVariantModel');

module.exports.addTocart = async (req, res) => {
    try {
        if (!req.body.user ||!req.body.variant_id) {
            return res.status(200).json({ message: 'all fields required' });
        }

        const alreadytExist = await Cart.findOne({ $and: [{ user: req.body.user }, { variant_id: req.body.variant_id }] });
        if (alreadytExist) {
            let qty = alreadytExist.quantity + 1;
            let newTotal = alreadytExist.total + req.body.price;
            await Cart.updateOne({ _id: alreadytExist._id }, { $set: { quantity: qty, total: newTotal } });
            return res.status(200).json({ message: 'quantity increased' });
        }
        const newCart = new Cart({
            user: req.body.user,
            variant_id: req.body.variant_id,
            total: req.body.price
        });
        await newCart.save();
        res.status(200).json({ message: 'product added to cart', data: newCart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.getCart = async (req, res) => {
    try {
        if(!req.body.user){
            return res.status(200).json({ message: 'all fields required' });
        }
        const cart = await Cart.find({ user: req.body.user });
        const cartData = [];      
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            let a = await Variant.findOne({ _id: cart[i].variant_id });
            let b = { ...a.toObject(), quantity: cart[i].quantity };
            cartData.push(b);
            total += cart[i].total;
        }
        res.status(200).json({ message: 'cart data', data: cartData, total: total });          
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.increaseCart = async (req, res) => {
    try {
        if (!req.body.user ||!req.body.variant_id) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const cart = await Cart.findOne({ $and: [{ user: req.body.user }, { variant_id: req.body.variant_id }] });
        if (cart) {
            let qty = cart.quantity + 1;
            let newTotal = cart.total + req.body.price;
            await Cart.updateOne({ _id: cart._id }, { $set: { quantity: qty, total: newTotal } });
            return res.status(200).json({ message: 'quantity increased' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.decreaseCart = async (req, res) => {
    try {  
        if (!req.body.user ||!req.body.variant_id) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const cart = await Cart.findOne({ $and: [{ user: req.body.user }, { variant_id: req.body.variant_id }] });
        if (cart) {
            let qty = cart.quantity - 1;
            let newTotal = cart.total - req.body.price;
            if (!qty >= 1) {
                return res.status(200).json({ message: 'something went wrong with your cart' });
            }
            await Cart.updateOne({ _id: cart._id }, { $set: { quantity: qty, total: newTotal } });
            return res.status(200).json({ message: 'quantity increased' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.removeCart = async (req, res) => {
    try {
        if (!req.body.user) {
         
        }
        if (!req.body.variant_id) {
            return res.status(200).json({ message: 'all fields required' });
        }
        await Cart.deleteOne({ $and: [{ user: req.body.user }, { variant_id: req.body.variant_id }] });
        res.status(200).json({ message: 'cart item removed' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


/*

const Cart = require('../models/cart');
const Variant = require('../models/productVariantModel');

module.exports.addTocart = async (req, res) => {
    try {
        if (!req.body.user || !req.body.variant_id) {
            return res.status(200).json({ message: 'all fields required' });
        }

        const alreadytExist = await Cart.findOne({ $and: [{ user: req.body.user }, { variant_id: req.body.variant_id }] });
        if (alreadytExist) {
            let qty = alreadytExist.quantity + 1;
            let newTotal = alreadytExist.total + req.body.price;
            await Cart.updateOne({ _id: alreadytExist._id }, { $set: { quantity: qty, total: newTotal } });
            return res.status(200).json({ message: 'quantity increased' });
        }
        const newCart = new Cart({
            user: req.body.user,
            variant_id: req.body.variant_id,
            total: req.body.price
        });
        await newCart.save();
        res.status(200).json({ message: 'product added to cart', data: newCart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.getCart = async (req, res) => {
    try {
        if (!req.body.user) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const cart = await Cart.find({ user: req.body.user });
        const cartData = [];
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            let a = await Variant.findOne({ _id: cart[i].variant_id });
            let b = { ...a.toObject(), quantity: cart[i].quantity };
            cartData.push(b);
            total += cart[i].total;
        }
        res.status(200).json({ message: 'cart data', data: cartData, total: total });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.increaseCart = async (req, res) => {
    try {
        if (!req.body.user || !req.body.variant_id) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const cart = await Cart.findOne({ $and: [{ user: req.body.user }, { variant_id: req.body.variant_id }] });
        if (cart) {
            let qty = cart.quantity + 1;
            let newTotal = cart.total + req.body.price;
            await Cart.updateOne({ _id: cart._id }, { $set: { quantity: qty, total: newTotal } });
            return res.status(200).json({ message: 'quantity increased' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.decreaseCart = async (req, res) => {
    try {
        if (!req.body.user || !req.body.variant_id) {
            return res.status(200).json({ message: 'all fields required' });
        }
        const cart = await Cart.findOne({ $and: [{ user: req.body.user }, { variant_id: req.body.variant_id }] });
        if (cart) {
            let qty = cart.quantity - 1;
            let newTotal = cart.total - req.body.price;
            if (!qty >= 1) {
                return res.status(200).json({ message: 'something went wrong with your cart' });
            }
            await Cart.updateOne({ _id: cart._id }, { $set: { quantity: qty, total: newTotal } });
            return res.status(200).json({ message: 'quantity increased' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}


module.exports.removeCart = async (req, res) => {
    try {
        if (!req.body.user) {

        }
        if (!req.body.variant_id) {
            return res.status(200).json({ message: 'all fields required' });
        }
        await Cart.deleteOne({ $and: [{ user: req.body.user }, { variant_id: req.body.variant_id }] });
        res.status(200).json({ message: 'cart item removed' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'server error' });
    }
}

*/