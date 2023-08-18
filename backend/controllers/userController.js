const User = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = require('twilio')(accountSid, authToken);

const WishList = require('../models/wishlistModel');
const Transaction = require('../models/transaction');

const Secret_Key = process.env.STRIPE_SECRET_KEY;
const stripe = require('stripe')(Secret_Key);


module.exports.signUp = async (req, res) => {
    try {
        const { name, address, email, password, phone_number } = req.body;

        // Validate the request data
        if (!name || !address || !email || !password || !phone_number) {
            return res.status(400).json({ message: 'all fields are required' });
        }
        const User = require('../models/userModels');
        // Hash the password before storing it in the database
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user record in the database
        const newUser = new User({ name, address, email, password: hashedPassword, phone_number });
        await newUser.save();

        // Send a response indicating that the registration was successful
        return res.status(201).json({ message: 'User registered successfully', data: newUser });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'server error' });
    }
};


module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).send('User not found');
        }

        //checking password is correct or not
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).send('Internal server error');
            }

            if (!result) {
                return res.status(401).send('Incorrect password');
            }

            const token = jwt.sign({ user: user._id, role: user.role }, process.env.JWT_SECRET_KEY);
            // var userToken = { ...user.toObject(), token };

            return res.status(200).json({ message: 'user login successfully',/* data: userToken */ token, user });
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'server error' });
    }
};


module.exports.quickSignUp = async (req, res) => {
    try {
        const { phone_number } = req.body;

        // Validate the request data
        if (!phone_number) {
            return res.status(400).json({ message: 'phone number required', success: false });
        }

        // Check if the email address is already in use
        const existingUser = await User.findOne({ phone_number });
        if (existingUser) {
            return res.status(200).json({ message: 'phone is already in use', success: false });
        }

        // Create a new user record in the database
        const newUser = new User({ phone_number });
        await newUser.save();

        // Send a response indicating that the registration was successful
        return res.status(201).json({ message: 'User registered successfully', success: true, data: newUser });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: 'server error' });
    }

};


module.exports.sms = async (req, res) => {
    try {
        if (!req.body.mobile) {
            return res.status(200).json({ message: 'mobile required' });
        }
        client.messages
            .create({ body: 'success', from: process.env.MOBILE, to: req.body.mobile })
            .then((message) => {
                console.log(message);
                return res.status(200).json({ message: 'message sent' });
            });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}


module.exports.updateIpToUser = async (req, res) => {
    try {
        if (!req.body.user || !req.body.ip) {
            return res.status(200).json({ message: 'user and ip required', success: false });
        }
        await WishList.updateOne({ user: req.body.ip }, { $set: { user: req.body.user } });
        return res.status(200).json({ message: 'ip updated with user id', success: true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}

module.exports.payment = async (req, res) => {
    const YOUR_DOMAIN = 'http://localhost:4200';
    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'inr',
                    unit_amount: req.body.amount * 100,
                    product_data: {
                        name: 'T-shirt'
                    },
                },
                quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/user/success`,
        cancel_url: `${YOUR_DOMAIN}/user/cancel`,
    });
    console.log('session', session);
    console.log('bbb', req.body);
    return res.json({ url: session.url });
}





module.exports.Webhook = async (req, res) => {
    let endpointSecret = "whsec_Rm5rrBrhrGhz4n9LNwtP3zSPYcASH6hw";
    let session;
    const sig = req.headers['stripe-signature'];
    console.log('body', req.body);
    console.log('sig', sig);
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
        console.log('event', event);
    } catch (err) {
        console.log('err', err);
        res.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.async_payment_failed':
            session = event.data.object;
            // Then define and call a function to handle the event checkout.session.async_payment_failed
            console.log('session1', session);
            return res.status(200).json({ message: 'failed' });


        case 'checkout.session.completed':
            session = event.data.object;
            let data = saveTransaction(session);
            console.log('result', data);
            if (data == 0) {
                return res.status(200).json({ message: 'transaction not saved' });
            } else if (data == 1) {
                return res.status(200).json({ message: 'transaction saved' });
            } else {
                return res.status(200).json({ message: 'failed' });
            }
        // Then define and call a function to handle the event checkout.session.async_payment_succeeded  

        default:
            console.log(`Unhandled event type ${event.type}`);
            return res.status(404).json({ message: 'event not found' });
    }
}


async function saveTransaction(data) {
    try {
        console.log("Inside the function");
        if (!data) {
            return 0;
        }
        const newTransaction = new Transaction({
            transaction_id: data.id,
            name: data.customer_details.name,
            email: data.customer_details.email,
            total_amount: data.amount_total,
            createdAt: data.created,
            status: data.status
        });
        await newTransaction.save();
        console.log('Transaction saved');
        return 1;
    } catch (error) {
        console.log(error);
        return -1;
    }
}

module.exports.getProfile = async (req, res) => {
    try {
        if (!req.body._id) {
            return res.status(200).json({ message: 'user_id required' });
        }
        const user = await User.findOne({ _id: req.body._id });
        if (user) {
            return res.status(200).json({ message: 'user profile', data: user });
        } else {
            return res.status(200).json({ message: 'user not found', data: user });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}


module.exports.updateProfile = async (req, res) => {
    try {
        const { _id, name, address, email, password, phone_number } = req.body;
        if (!_id || !name || !address || !email || !password || !phone_number) {
            return res.status(200).json({ message: 'all fields are required' });
        }
        await User.updateOne({ _id: req.body._id }, { $set: req.body });
        return res.status(200).json({ message: 'data updated' });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'server error' });
    }
}


module.exports.getAllUser = async (req, res) => {
    try {
       const allUsers = await User.find({});
       return res.status(200).json({message:'All users',data:allUsers})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Internal server error'});
    }
}






// const User = require('../models/userModels');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');


// module.exports.signUp = async (req, res) => {
//     try {
//         const { name, address, email, password, phone_number } = req.body;

//         // Validate the request data
//         if (!name || !address || !email || !password || !phone_number) {
//             return res.status(400).json({ message: 'all fields are required' });
//         }

//         // Check if the email address is already in use
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(409).json({ message: 'Email address is already in use' });
//         }

//         // Hash the password before storing it in the database.
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user record in the database
//         const newUser = new User({ name, address, email, password: hashedPassword, phone_number });
//         await newUser.save();

//         // Send a response indicating that the registration was successful
//         res.status(201).json({ message: 'User registered successfully', data: newUser });
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({ message: 'server error' });
//     }
// };   

// module.exports.login = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         //checking password is correct or not
//         bcrypt.compare(password, user.password, (err, result) => {
//             if (err) {
//                 return res.status(500).send('Internal server error');
//             }

//             if (!result) {
//                 return res.status(401).send('Incorrect password');
//             }

//             const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET_KEY);

//             return res.status(200).json({ message: 'user login successfully', token, user });
//         });
//     } catch (error) {    
//         console.log(error.message);
//         res.status(500).json({ message: 'server error' });
//     }

// };      

