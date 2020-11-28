import React from 'react';



class RemoveAll extends React.Component {
    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <button onClick={this.props.handleRemoveAll}>RemoveAll</button>
            </div>
        )
    }
}

export default RemoveAll

