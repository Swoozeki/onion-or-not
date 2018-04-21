import React from 'react';

module.exports = function(props){
    const buttonStyles = {onion: {width: '50%'}, notOnion: {width: '50%'}};
    let votesTotal = null;
    const {onion: onionVotes, notOnion: notOnionVotes} = props.votes;
    const {voted, handleVote} = props;

    if(voted){
        votesTotal = onionVotes + notOnionVotes;
        buttonStyles.onion.width= `${((onionVotes)/votesTotal)*100}%`;
        buttonStyles.notOnion.width= `${((notOnionVotes)/votesTotal)*100}%`;
    }

    return(
        <div id="vote">
            <div id="onion" className="vote-button"
                data-type="onion" style={buttonStyles.onion}
                onClick={handleVote}
                >{voted?'':'ONION'}
            </div>
            <div id="not-onion"  className="vote-button"
                data-type="notOnion" style={buttonStyles.notOnion}
                onClick={handleVote}
                >{voted?'':'NOT ONION'}
            </div>
        </div>
    );
}