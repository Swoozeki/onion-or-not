module.exports.top_get = function (req, res, next) {
    const {Headline} = req.models;

    Headline.findAll({where: {freshness: 'top'}})
        .then(headlines => {
            const randomIndex = Math.floor(Math.random()*(headlines.length-1));

            return res.json(headlines[randomIndex]);
        })
        .catch(err => next(err));
}
module.exports.new_get = function (req, res, next) {
    const {Headline} = req.models;

    Headline.findAll({where: {freshness: 'new'}})
        .then(headlines => {
            const randomIndex = Math.floor(Math.random()*(headlines.length-1));

            return res.json(headlines[randomIndex]);
        })
        .catch(err => next(err));
}
module.exports.headlines_get = function (req, res, next) {
    const {Headline} = req.models;

    Headline.findAll()
        .then(headlines => res.json(headlines))
        .catch(err => next(err));
}