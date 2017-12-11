import React, {Component} from 'react';
import './App.css';
import Person from './Person/Person.js'

class App extends Component {

    state = {
        persons: [
            {name: 'Max', age: 28},
            {name: 'Manu', age: 39},
            {name: 'Stephanie', age: 26}
        ]
    }

    switchNameHandler = (newName) => {
        // console.log('Was clicked!');
        this.setState({
            persons: [
                {name: newName, age: 28},
                {name: 'Manu', age: 39},
                {name: 'Stephanie', age: 27}
            ]
        });
    }

    nameChangedHandler = (event) => {
        this.setState({
            persons: [
                {name: 'Max', age: 28},
                {name: event.target.value, age: 39},
                {name: 'Stephanie', age: 27}
            ]
        });
    }

    render() {

        const style = {
            backgroundColor: 'white',
            font: 'inheriet',
            border: '1px solid blue',
            padding: '8px'
        }

        return (
            <div className="App">
                <h1>test</h1>
                <button
                    style={style}
                    onClick={() => this.switchNameHandler('Maxmilian!!!')}>Switch Name
                </button>
                <Person
                    name={this.state.persons[0].name} age={this.state.persons[0].age}/>
                <Person
                    name={this.state.persons[1].name} age={this.state.persons[1].age}
                    click={this.switchNameHandler.bind(this, 'Max!')}
                    changed={this.nameChangedHandler}>My Hobbies: Racing</Person>
                <Person
                    name={this.state.persons[2].name} age={this.state.persons[2].age}/>
            </div>
        );
    }
}

export default App;
