import _ from 'lodash';
import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import routes from './app/routes/main.js';
import parser from 'body-parser';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const app = express();

app.set('port', process.env.PORT || 3000);
const SALT_WORK_FACTOR = 10;

//connect to MongoDB
mongoose.connect('mongodb://localhost/auth');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log("MongoDB connected!");
});


// Schema for users collection.
const userSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true }
});

// Create collection 'users'.
const User = mongoose.model('Users', userSchema);

app.use((req, res, next) => {
  res.setHeader('X-Powered-By', 'Rohith Auth App');
  next();
});

app.use('/', express.static(path.join(__dirname, 'public'), {
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  },
  dotfiles: 'ignore',
  etag: false,
}));

app.engine('hbs', handlebars({
  defaultLayout: 'index',
  extname: 'hbs',
}));
app.set('view engine', 'hbs');

// Application Middleware
app
  .use(parser.json())
  .use(parser.urlencoded({
    extended: true,
  }));

// Middlewares
app.use(routes());

// POST requests
app.post("/login", (req, res) => {
  // Create a record of type users and save.
  const testUser = new User({
    username: req.body.username,
    password: req.body.password
  });
  testUser.save((err, doc) => {
    if(err) res.json(err);
    else res.send('Logged In...');
  });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

// error handler
// define as the last app.use callback
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(app.get('port'), () => console.log('Listening on port 3000!'));
