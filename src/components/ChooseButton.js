import React from 'react';

const ChooseButton = (props) => {
    return (
        <div>
            <button disabled={!props.hasOptions}
                    onClick={props.handlePick}
            >Choose</button>
        </div>
    )
}

export default ChooseButton


