import React from 'react';
import Option from './Option'

class Options extends React.Component {
    constructor(props){
        super(props)

    }


    render() {
        return (
            <div>
                {this.props.options.map(option => <Option
                    optiontext={option}
                    key={option}
                    handleDeleteOption={this.props.handleDeleteOption}/>
               )}
            </div>
        )
    }
}

export default Options