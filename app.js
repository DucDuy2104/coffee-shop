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

// home page
app.get('/', (req, res) => {
  return res.status(200).render('404');
});



// verify success
app.get('/success', (req, res) => {
  return res.status(200).render('verified_success');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
