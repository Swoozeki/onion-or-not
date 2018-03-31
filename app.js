const express = require('express');
const app = express();

const logger = require('morgan');
const bodyParser = require('body-parser');

//setup app
app.use(logger('tiny'));
app.use(express.static('./static'));
app.use(bodyParser.json(), bodyParser.urlencoded({extended:false}));

//helper function to fetch new headlines
require('./helpers/fetch-new-headlines.js')();

//import routes
require('./routes.js')(app);

app.listen(8000, err => {
    if(err) return console.log(err);
    else console.log('Server started at localhost:8000');
});