var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session');
// const generateData = require('./dataGeneration');

var indexRouter = require('./routes/index');
var signupRouter = require('./routes/signup')
var loginRouter = require('./routes/login');

var swipeLeftRouter = require('./routes/swipeLeft');
var swipeRightRouter = require('./routes/swipeRight');


var messageRouter = require('./routes/messageRoutes');
var chatRouter = require('./routes/chatRoutes');
var chatgptRouter = require('./routes/chatgptRoutes');


var userRouter = require('./routes/userRoutes');


var app = express();

mongoose.connect('mongodb+srv://Kianhk6:22547349kK@cluster0.xu9zxpv.mongodb.net/?retryWrites=true&w=majority', 
{
  useNewUrlParser: true, 
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
    // generateData();
    console.log("DB connected.");
});

app.use(cors());

app.use(
  session({
      cookie:{
          maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
          httpOnly: true,
          sameSite: 'lax', // protecting csrf
          secure: false, //cookie only works in https
      },
      saveUninitialized: false, // create session by default even no data : false
      secret: "dsfklsjfklasjfljasfmdscsmlamc",
      resave: false,
  })
)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.use('/swipeLeft', swipeLeftRouter);
app.use('/swipeRight', swipeRightRouter);

app.use('/message', messageRouter);
app.use('/chat', chatRouter);
app.use('/chatgpt', chatgptRouter);

app.use('/user', userRouter);

module.exports = app;
