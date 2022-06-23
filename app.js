var express = require('express'); // Express web server framework
 const path = require('path');

 var app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

const routes = require('./routes/api');
app.use(routes);
 
console.log('Listening on 8888');
app.listen(8888);