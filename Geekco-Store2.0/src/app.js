const createError = require('http-errors');
const express = require('express');
const path = require('path');
const expressValidator = require('express-validator')
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const methodOverride = require('method-override')
const session = require("express-session")
const indexRouter = require('./routes/index.js');
const usersRouter = require('./routes/users.js');
const productsRouter = require('./routes/products.js');
const APIUsersRouter = require('./routes/api/APIusers.js');
const APIProductsRouter = require('./routes/api/APIproducts.js');
const APICategoriesRouter = require('./routes/api/APIcategories.js');
const cors = require('cors');
const rememberMiddleware = require("./Middlewares/rememberMe.js")
const app = express();

const bodyParser = require('body-parser');

// Configurar body-parser para analizar datos de formulario

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));
app.use(methodOverride("_method"))
app.use(session({secret: "Secretgecko123",resave: false,
saveUninitialized: true}))
app.use((req, res, next) => {
  if (req.session.user) {
    const { rol_id } = req.session.user;
    const isAdmin = rol_id === 2;
    res.locals.user = req.session.user;
    res.locals.isAdmin = isAdmin;
  }
  next();
});
app.use('/images', express.static(path.join(__dirname, '/images')));
app.use(rememberMiddleware)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/productos', productsRouter);


// Rutas para el acceso de las API

app.use('/api/users',APIUsersRouter);
app.use('/api/products',APIProductsRouter);
app.use('/api/categories',APICategoriesRouter);

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
