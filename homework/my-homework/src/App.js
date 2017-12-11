import React, {Component} from 'react';
import './App.css';
import './User/UserInput.js'
import './User/UserOutput.js'
import UserInput from "./User/UserInput";
import UserOutput from "./User/UserOutput";

class App extends Component {

    state = {username: ''}

    onUserNameChangeHandling = (event) => {
        this.setState({username: event.target.value});

    }

    render() {
        return (
            <div className="App">
                <UserInput onChange={this.onUserNameChangeHandling}/>
                <UserOutput username={this.state.username}/>
            </div>
        );
    }
}

export default App;
