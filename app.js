const express = require('express');
const app = express();

const helmet = require('helmet');
const logger = require('morgan');
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');

/*
    Setup sequelize, and pass the created models to the Request object
    Created models will be available from any middleware at Request.models
*/
const dbAddress = process.env.PG_URI || 'postgres://wjzdssqo:oTdYEcAjKFQo9DlPy_SbiwYRcweTrhwC@stampy.db.elephantsql.com:5432/wjzdssqo';
const sequelize = new Sequelize(dbAddress, {logging: false});
sequelize.authenticate().then(()=>console.log('database authenticated')).catch(err=>console.log(err));
const Headline = sequelize.import('./models/Headline.js');
app.use((req, res, next) => {
    req.models = {Headline};
    return next();
});

/*
    Setup the app with several useful third-party middlewares
    Helmet - to protect against well-known vulnerabilities
    Logger - to log http requests to console
    Express Static - to load static content from /static/
    BodyParser - to populate http request body in Request.body to be accessibly from any middleware
*/
app.use(helmet());
app.use(logger('tiny'));
app.use(express.static('./static'));
app.use(bodyParser.json(), bodyParser.urlencoded({extended:false}));

//helper function to fetch headlines and save them to the database
require('./helpers/fetch-new-headlines.js')(Headline);

//import routes
require('./routes.js')(app);

app.listen(8000, err => {
    if(err) return console.log(err);
    else console.log('Server started at localhost:8000');
});