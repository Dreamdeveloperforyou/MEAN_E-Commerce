const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((connection) => {
    console.log('database connected');
}).catch((error) => {
    console.error(error.message);
});