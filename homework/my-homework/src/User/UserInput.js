import React from 'react';

const UserInput = (props) => {
    return (
        <div>
            <p>What's your name?</p>
            <input type="text" onChange={props.onChange}/>
        </div>
    );
}

export default UserInput;
