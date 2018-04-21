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
module.exports.votes_update = function(req, res, next){
    const {Headline} = req.models;

    Headline.findById(req.params.headlineId)
        .then(headline => {
            const votesOption = {};
            if(req.body.type==='onion'){
                votesOption.notOnion= headline.votes.notOnion;
                votesOption.onion= headline.votes.onion+req.body.change;
            }
            else if(req.body.type==='notOnion'){
                votesOption.onion= headline.votes.onion;
                votesOption.notOnion=headline.votes.notOnion+req.body.change;
            }
            headline.update({votes: votesOption})
                .then(()=>{
                    return res.send(headline);
                })
                .catch(()=>res.send(new Error(`Sorry, couldn't it!`)));
        })
        .catch(err=>res.send(err));
}