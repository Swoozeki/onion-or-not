module.exports.top_get = function (req, res, next) {
    const {Headline} = req.models;

    Headline.findAll({where: {freshness: 'top'}})
        .then(headlines => res.json(headlines))
        .catch(err => next(err));
}
module.exports.new_get = function (req, res, next) {
    const {Headline} = req.models;

    Headline.findAll({where: {freshness: 'new'}})
        .then(headlines => res.json(headlines))
        .catch(err => next(err));
}