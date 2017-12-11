import React from 'react';

const UserOutput = (props)=> {
    return (
        <div>
            <p>Your name is:</p>
            <p>{props.username}</p>
        </div>
    );
}

export default UserOutput;
