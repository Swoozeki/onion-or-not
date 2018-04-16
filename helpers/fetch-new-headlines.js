const axios = require('axios');

const millisecondsInDay = 86400000;
const millisecondsInWeek = 604800000;

let HeadlineModel;
/*
    fetch new headlines every day, and top headlines every week
*/
module.exports = function (Headline) {
    HeadlineModel = Headline;
    
    //in case the last fetched new headlines are over a day old
    getLastFetched('new', function(lastNewFetched, err){
        if(err) return console.log(err);
        if (Date.now() - lastNewFetched >= millisecondsInDay) {
            getHeadlines('new');
        }
    });
    
    //in case the last fetched top headlines are over a week old
    getLastFetched('top', function(lastTopFetched, err){
        if(err) return console.log(err);
        if (Date.now() - lastTopFetched >= millisecondsInWeek) {
            getHeadlines('top');
        }
    });

    setTimeout(function () { //fetch new headlines every 24 hours
        getHeadlines('new');
    }, millisecondsInDay);
    setTimeout(function () { //fetch top headlines every week
        getHeadlines('top');
    }, millisecondsInWeek);
};

/*
    get headlines from all relevant subreddits and push to database
    param freshness indicates whether headlines should be from new or top section
*/
function getHeadlines(freshness) {
    let headlines = [];
    const urlQueries = freshness === 'top' ? 'sort=top&t=week' : '';
    axios.all([
            axios.get(`https://www.reddit.com/r/nottheonion/${freshness}.json?${urlQueries}`),
            axios.get(`https://www.reddit.com/r/theonion/${freshness}.json?${urlQueries}`)
        ])
        .then(axios.spread(function (notOnion, onion) {
            headlines.push(
                ...refinePosts(freshness, notOnion.data.data.children),
                ...refinePosts(freshness, onion.data.data.children)
            );

            pushToDatabase(freshness, headlines);
        }))
        .catch(err => {
            throw err;
        });
}

function getLastFetched(freshness, callback) { //get last fetched from 'createdAt' column on headlines table
    HeadlineModel.find({where:{freshness: freshness}})
        .then(headline => headline?callback(new Date(headline.createdAt).getTime()):callback(0))
        .catch(err => callback(null, err));  
}

function refinePosts(freshness, responsePosts) {
    const refinedPosts = [];
    responsePosts.map(responsePost => {
        responsePost = responsePost.data;
        refinedPosts.push({
            headline: responsePost.title,
            URL: responsePost.url,
            imageURL: responsePost.preview?responsePost.preview.images[0].source.url:'',
            subreddit: responsePost.subreddit.toLowerCase(),
            freshness: freshness,
            votes: {onion: 0, notOnion: 0}
        });
    });
    return refinedPosts;
}

function pushToDatabase(freshness, headlines) {
    if(freshness === 'new'){
        HeadlineModel.destroy({where: {freshness: freshness}})
            .then(affectedHeadlines => console.log(`${affectedHeadlines} ${freshness} headlines were deleted!`))
            .catch(err => console.log(err));
    }
    HeadlineModel.bulkCreate(headlines)
        .then(()=>console.log(`created ${headlines.length} ${freshness} headlines`))
        .catch(err => console.log(err));
} 