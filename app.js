const config = {
  host: 'localhost',
  port: 5432,
  database: 'buddy_pass',
  user: 'postgres',
  password: ''
};

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const ejs = require('ejs');

const setupAuth = require('./auth');

const Sequelize = require('sequelize');
const FunctionModel = require('./models/functionalareas');
const SkillsModel = require('./models/skills');
const UsersModel = require('./models/users');

const connectionString = `postgres://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`;
const sequelize = new Sequelize(process.env.DATABASE_URL || connectionString, {
  dialect: 'postgres',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

//models
const Users = UsersModel(sequelize, Sequelize);
const FunctionalAreas = FunctionModel(sequelize, Sequelize);
const Skills = SkillsModel(sequelize, Sequelize);


//Routes
const apiRouter = require('./routes/api');
const loginRouter = require('./routes/login');
const profileRouter = require('./routes/profile');
const adminRouter = require('./routes/adminInput');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
require('dotenv').config();

const db = require('./models');

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.engine('ejs', ejs({ extname: 'ejs' }));
app.set('view engine', 'ejs');

setupAuth(app);

// set up other express middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public'))); // look for static files in the 'public' folder

app.use('/api', apiRouter);
app.use('/login', loginRouter);
app.use('/profile', profileRouter);
app.use('/adminInput', adminRouter);
app.use('/users', usersRouter);
app.use('/', indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});

module.exports = app;
