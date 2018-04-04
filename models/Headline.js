module.exports = function(sequelize, DataTypes){
    const Headline = sequelize.define('headlines', {
        headline: DataTypes.STRING,
        url:DataTypes.STRING,
        subreddit: DataTypes.STRING,
        freshness: DataTypes.STRING,
        votes: DataTypes.JSON
    });

    Headline.sync({alter: true});

    return Headline;
}