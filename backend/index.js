require('dotenv').config();
require('./config/dataBase');
const express = require('express');

const app = require('express')();
const cors = require('cors');
const path = require('path');
const http = require('http').createServer(app);
const bodyParser = require("body-parser");

app.use(
    bodyParser.urlencoded({   extended: true,    })
);

const directory = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(directory)); 
// app.use(require('express').json());
app.use(require('cors')());


//user routes
const userRoutes = require('./routes/userRoute');
app.use('/api', userRoutes);


//product routes
const productRoutes = require('./routes/productRoute');
app.use('/api', productRoutes);
  
   
//category routes
const categoryRoutes = require('./routes/categoryRoute');
app.use('/api', categoryRoutes);

//Variant routes
const variantRoutes = require('./routes/productVariantRoute');
app.use('/api',variantRoutes);


//VariantAttribute routes
const variantAttributeRoutes = require('./routes/variantAttributeRoute');
app.use('/api',variantAttributeRoutes);

//wishList routes
const wishListRoutes = require('./routes/wishlistRoute');
app.use('/api', wishListRoutes);

//order routes
const orderRoutes = require('./routes/orderRoute');
app.use('/api', orderRoutes);

//address routes
const addressRoutes = require('./routes/shippinAddressRoute');
app.use('/api', addressRoutes);

//Promocode routes
const promocodeRoutes = require('./routes/promocodeRoute');
app.use('/api', promocodeRoutes);

//Tax routes
const taxRoutes = require('./routes/taxRoute');
app.use('/api', taxRoutes);

http.listen(process.env.PORT, () => {
    console.log('server listen on port', process.env.PORT);
});

