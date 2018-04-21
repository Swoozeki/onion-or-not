const headlineController = require('./controllers/headline_controller.js');

module.exports = function (app) {
    //homepage route
    app.get('/', function (req, res, next) {
        res.sendFile('index.html', {
            root: './'
        })
    });

    //routes that manipulate the database
    app.post('/:headlineId/vote', headlineController.votes_update);

    /*
        headline routes
        /top/ and /new/ responds with a single random corresponding headline
        /all/ responds with all headlines in database
    */
    app.get('/top', headlineController.top_get);
    app.get('/new', headlineController.new_get);
    app.get('/all', headlineController.headlines_get);

    //404 for the rest
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