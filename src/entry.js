import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component{
    render(){
        return <h1>Well, this is hecking cool!</h1>
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));