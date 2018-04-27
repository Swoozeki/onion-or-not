import React from 'react';

module.exports = function Header(props){
    const {page} = props;

    return(
        <div id="header">
            <img id="logo" src="media/logo6.png" alt="here lies the logo"/>
            <ul id="menu">
                <li id="new" className={page==='new'?'active':''} onClick={()=>props.changePage('new')}>
                    new
                </li>
                <li id="top" className={page==='top'?'active':''} onClick={()=>props.changePage('top')}>
                    top
                </li>
            </ul>
        </div>
    );
}