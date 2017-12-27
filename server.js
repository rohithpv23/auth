import _ from 'lodash';
import express from 'express';
import path from 'path';
import handlebars from 'express-handlebars';

const app = express();

app.get('/login', (req, res) => res.render('pages/login'));

app.set('port', process.env.PORT || 3000);

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

app.listen(app.get('port'), () => console.log('Listening on port 3000!'));


app.post("/login", function (req, res) {
  res.send('Logged In...');
});
