import React from 'react';

module.exports = function Stage(props){
    const {headline: title, imageURL} = props.headline;
    return (
        <React.Fragment>
            <h1 id="title">{title}</h1>
            {imageURL?<img src={imageURL}/>:null}
        </React.Fragment>
    );
}