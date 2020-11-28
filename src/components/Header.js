import React from 'react';

class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            title : props.title
        }
    }
    render() {
        return (
            <div>
                <h1>{this.state.title}</h1>
            </div>
        )
    }
}

Header.defaultProps = {
    title : "Default Title"
}

export default Header