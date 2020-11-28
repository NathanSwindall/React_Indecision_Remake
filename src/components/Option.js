import React from 'react';

const Option = (props)=> {
    return (
        <div>
            {props.optiontext}
            <button onClick={(e) => props.handleDeleteOption(props.optiontext)}>Remove</button>
        </div>
    )
}


export default Option