import _ from 'lodash';
import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';
import routes from './app/routes/main.js';
import parser from 'body-parser';

const app = express();

app.set('port', process.env.PORT || 3000);

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
app.post("/login", function (req, res) {
  res.send('Logged In...');
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
