import React from 'react';


const ValidationComponent = (props) => {

    const textLength = props.textLength;

    let message = null;

    if (textLength <= 5) {
        message = 'Text too short'
    } else {
        message = 'Text long enough'
    }

    return <p>{message}</p>
};

export default ValidationComponent;