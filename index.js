var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config()
var cors = require('cors');


require('./models/product')
require('./models/user')
require('./models/category')
require('./models/cart')
require('./models/voucher')
require('./models/address')
require('./models/banner')
require('./models/order_detail')
require('./models/order')
require('./models/review')

var usersRouter = require('./routes/users');
var authRouter = require('./routes/auth');
var productRouter = require('./routes/products');
var categoriesRouter = require('./routes/categories');
var cartsRouter = require('./routes/carts');
var vouchersRouter = require('./routes/vouchers');
var addressesRouter = require('./routes/addresses');
var bannersRouter = require('./routes/banners');
var ordersRouter = require('./routes/orders');
var statisticRouter = require('./routes/statistic');
var reviewsRouter = require('./routes/reviews');

const { default: mongoose } = require('mongoose');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter);
app.use('/auth', authRouter);
app.use('/products', productRouter);
app.use('/categories', categoriesRouter);
app.use('/carts', cartsRouter);
app.use('/vouchers', vouchersRouter);
app.use('/addresses', addressesRouter);
app.use('/banners', bannersRouter);
app.use('/orders', ordersRouter);
app.use('/statistic', statisticRouter);
app.use('/reviews', reviewsRouter);

// home page
app.get('/', (req, res) => {
  return res.status(200).render('404');
});


// verify success
app.get('/success', (req, res) => {
  return res.status(200).render('verified_success');
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch(err => {
    console.error('Error connecting to MongoDB:', err.message);
  });


