const headlineController = require('./controllers/headline_controller.js');

module.exports = function (app) {
    //index route
    app.get('/', function (req, res, next) {
        res.sendFile('index.html', {
            root: './'
        })
    });

    //manipulate DB routes
    app.post('/:headlineId/vote', headlineController.votes_update);

    //reddit api routes
    app.get('/top', headlineController.top_get);
    app.get('/new', headlineController.new_get);
    app.get('/all', headlineController.headlines_get);

    app.get('*', function (req, res, next) {
        const err = new Error('404: Page not found!');
        err.status = 404;
        next(err);
    });
    //error handler route
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send(err);
    });
}