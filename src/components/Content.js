import React from 'react';
import Stage from './Stage';
import Result from './Result';
import Vote from './Vote';

module.exports = class Content extends React.Component{
    constructor(){
        super();
        this.state= {
            headline: null,
            voted: false
        };
    }
    handleVote(e){
        //make request to change vote
        fetch(`/${this.state.headline.id}/vote`, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                type: e.target.dataset.type,
                change: 1
            })
        })
            .then(response=>response.json())
            .then(headline=>{
                return this.setState({voted: true, headline});
            })
            .catch(err => console.log(err));
        //---------
    }
    setHeadline(){
        fetch(`/${this.props.page}`)
            .then(response => {
                return response.json()
            })
            .then(headline => {
                return this.setState({headline, voted: false});
            })
            .catch(err => console.log(err)); 
    }
    componentDidMount(){
        this.setHeadline();
    }
    componentWillReceiveProps(){
        this.setHeadline();
    }
    render(){   
        const {headline, voted} = this.state;
        let stage, result= null;
        //loading screen while headline is being fetched
        if(!headline){ 
            return(
                <div id="content" className="flex flex-center">
                    <h1>getting headline...</h1>
                </div>
            );
        }

        if(!voted) stage = <Stage headline={this.state.headline}/>;
        if(voted) result = <Result/>;

        return(
            <div id="content" className='flex flex-column flex-center'>
                {stage}
                <Vote votes={this.state.headline.votes} 
                    voted={this.state.voted} 
                    handleVote={this.handleVote.bind(this)}/>
                {result}
            </div>
        )

    }
}