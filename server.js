
const express = require('express');             
const morgan = require('morgan');               
const bodyParser = require('body-parser');        
const mongoose = require('mongoose');          
const cors = require('cors');                      
const config = require('./config');

const app = express();                            

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/images",express.static("images"));
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }))

mongoose.connect(config.database,  { useNewUrlParser: true , useUnifiedTopology: true },err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to the database');
  }
});

const userRoutes = require('./routes/account');
const mainRoutes = require('./routes/main');
const sellerRoutes = require('./routes/seller');
const productSearchRoutes = require('./routes/product-search');

app.use('/api', mainRoutes);
app.use('/api/accounts', userRoutes);
app.use('/api/seller', sellerRoutes);
app.use('/api/search', productSearchRoutes);


app.listen(config.port, err => {
  console.log('Server connected at port: ' + config.port);
});
