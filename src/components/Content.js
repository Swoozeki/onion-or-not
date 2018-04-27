import React from 'react';
import Stage from './Stage';
import Vote from './Vote';

module.exports = class Content extends React.Component{
    constructor(){
        super();
        this.state= {
            headline: null,
            voted: false
        };
    }

    /*
        Makes server request to update headline vote
        Parameters - e:EventObject
    */
    handleVote(e){
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

    /*
        Makes server request to get headline, and sets the component's headline state to the response
    */
    setHeadline(){
        this.setState({headline:null, voted: false})
        fetch(`/${this.props.page}`)
            .then(response => {
                return response.json()
            })
            .then(headline => {
                return this.setState({headline});
            })
            .catch(err => console.log(err)); 
    }

    //get and set headline when component initally mounts
    componentDidMount(){
        this.setHeadline();
    }
    
    //get and set new headline when component recieves new/updated props(mainly the page prop)
    componentWillReceiveProps(){
        this.setHeadline();
    }
    render(){   
        const {headline, voted} = this.state;

        //show loading screen while headline is being fetched
        if(!headline){ 
            return(
                <div id="content" className="flex flex-center">
                    <h1>getting headline...</h1>
                </div>
            );
        }

        return(
            <div id="content" className="flex flex-column flex-center">
                <Stage voted={voted} headline={this.state.headline}/>
                <Vote voted={voted} votes={headline.votes} handleVote={this.handleVote.bind(this)}/>
            </div>
        )

    }
}