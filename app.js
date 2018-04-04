const express = require('express');
const app = express();

const logger = require('morgan');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://wjzdssqo:oTdYEcAjKFQo9DlPy_SbiwYRcweTrhwC@stampy.db.elephantsql.com:5432/wjzdssqo', {logging: false});

sequelize.authenticate().then(()=>console.log('database authenticated')).catch(err=>console.log(err));
const Headline = sequelize.import('./models/Headline.js');
app.use((req, res, next) => req.models = {Headline});

//setup app
app.use(logger('tiny'));
app.use(express.static('./static'));
app.use(bodyParser.json(), bodyParser.urlencoded({extended:false}));

//helper function to fetch new headlines
require('./helpers/fetch-new-headlines.js')(Headline);

//import routes
require('./routes.js')(app);

app.listen(8000, err => {
    if(err) return console.log(err);
    else console.log('Server started at localhost:8000');
});