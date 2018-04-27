import React from 'react';

module.exports = function(props){
    const {handleVote, votes, voted} = props;
    const style = {onion:{}, notOnion:{}};
    const total = votes.onion + votes.notOnion;

    if(voted){
        style.onion.width = `${((votes.onion/total)*100).toFixed(2)}%`;
        style.notOnion.width = `${((votes.notOnion/total)*100).toFixed(2)}%`;
        style.onion.height = style.notOnion.height = '50px';
    }

    return(
        <div id="vote" className={`fixed-bottom ${voted?'unclickable':null}`}>
            <div id="onion" className="vote-button"
                data-type="onion" onClick={handleVote}
                style={voted?style.onion:null}>
                {voted?style.onion.width:'ONION'}
            </div>
            <div id="not-onion"  className="vote-button"
                data-type="notOnion" onClick={handleVote}
                style={voted?style.notOnion:null}>
                {voted?style.notOnion.width:'NOT ONION'}
            </div>
        </div>
    );
}