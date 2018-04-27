import React from 'react';

module.exports = function Stage(props){
    const {voted} = props;
    const {headline: title, imageURL, subreddit} = props.headline;

    const titleComponent = (
        <h1 id="title" className={voted?(subreddit==='theonion'?'onion-color':'not-onion-color'):null}>
            {voted?<a target="_blank" href={props.headline.URL}>{title}</a>:title}
        </h1>
    );

    //reveals whether title is onion or not
    let revealComponent = null;
    if(voted)
        revealComponent = (
            <h1 id="reveal" className={`slide-right ${subreddit==='theonion'?'onion-bg-color':'not-onion-bg-color'}`}>
                {subreddit==='theonion'?'ONION':'NOT ONION'}
            </h1>
        );

    return (
        <div id="stage">
            {revealComponent}
            {titleComponent}
            {imageURL?<img src={imageURL}/>:null}
        </div>
    );
}