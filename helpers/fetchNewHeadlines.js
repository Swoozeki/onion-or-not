const axios = require('axios');

const millisecondsInDay = 86400000;

module.exports = function () {
    const lastFetched = getLastFetched();
    if(Date.now() - lastFetched >= millisecondsInDay){ //in case headlines weren't fetched after 24 hours
        getTop();
        getNew();
    }
    setTimeout(function(){ //fetch headlines every 24 hours
        getTop();
        getNew();
    }, millisecondsInDay);
};

function getTop() {
    axios.get('https://reddit.com/r/nottheonion/top.json')
        .then(response => {
            const posts = refinePosts('top', response.data.data.children);
            console.log('top: '+ posts.length);
        })
        .catch(err => console.log(err));
}

function getNew() {
    axios.get('https://reddit.com/r/nottheonion/new.json')
        .then(response => {
            const posts = refinePosts('new', response.data.data.children);
            console.log('new: '+ posts.length);
        })
        .catch(err => console.log(err));
}

function getLastFetched(){ //get last fetched from 'createdAt' column on headlines table
    return 0;
}

function refinePosts(type, responsePosts) {
    const refinedPosts = [];
    responsePosts.map(responsePost => {
        responsePost = responsePost.data;
        refinedPosts.push({
            headline: responsePost.title,
            url: responsePost.url,
            subreddit: responsePost.subreddit,
            type: type
        });
    });
    return refinedPosts;
}