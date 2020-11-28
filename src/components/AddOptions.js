import React from 'react';

class AddOptions extends React.Component {
    constructor(props){
        super(props)
        this.AddOptions = this.AddOptions.bind(this)
    }



    AddOptions(e){
        e.preventDefault() // prevents page from refreshing

        let formSubmission = e.target.elements.elementName.value.trim()

        let error = this.props.handleForm(formSubmission)
        this.props.handleError(error)
        
        if(!error)
        {
            e.target.elements.elementName.value = ""
        }
        
    }

    render() {
        return (
            <div>
                {this.props.getErrorState() && <p>{this.props.getErrorState()}</p>}
                <form onSubmit={this.AddOptions}>
                <input type="text" name="elementName"></input>
                <button>Add Option</button>
                </form>
            </div>
        )
    }
}



export default AddOptions