import React from 'react';
import ReactDOM from 'react-dom';

import Header from './components/Header';
import Content from './components/Content';

class App extends React.Component{
    constructor(){
        super();
        this.state = {
            page: 'new'
        };
    }
    
    /*
        Changes page state
        Parameters - page:String
    */
    changePage(page){
        this.setState({page});
    }

    render(){
        return(
            <div id="wrapper">
                <Header page={this.state.page} changePage={this.changePage.bind(this)}/>
                <Content page={this.state.page} changePage={this.changePage.bind(this)}/>
                {/* <Footer/> */}
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));