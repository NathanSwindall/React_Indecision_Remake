//babel src/app.js --out-file=public/scripts/app.js --presets=env,react --watch
import React from 'react';
import ReactDOM from 'react-dom';

class IndecisionApp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            options :  props.options
        }

        this.handleDeleteOptions = this.handleDeleteOptions.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.handlePick = this.handlePick.bind(this)
        this.handleAddOptions = this.handleAddOptions.bind(this)
    }

    componentDidMount() {
        try {
        const json = localStorage.getItem('options')
        const options = JSON.parse(json)
        if(options){
            this.setState(() => ({options}))
        }

        console.log('fetching data')
        } catch (e) {

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevState.options.length !== this.state.options.length) //this.state.options = is current 
        {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem("options", json)
            console.log("saving data")
        }
    }
    componentWillUnmount() {
        console.log('componentWillUnmounts')
    }


    handleDeleteOptions () {
        this.setState(() => ({options : []}))
    }

    handleDeleteOption (optionToBeRemoved) {
        this.setState((prevState) => ({
            options : prevState.options.filter((option) => option !== optionToBeRemoved)
        }))
    }

    handleAddOptions (option) {
        if(!option) { // an empty string is false
            return "This is an empty string"
        }else if(this.state.options.indexOf(option) > -1) // if it is negative 1 it does not exist
        {
            return "This is already an option"
        }

        // If it gets here it will return null
        this.setState( (prevState) => ({options : prevState.options.concat(option)}))//This gives a new array back -> You never want to manipulate the previous state

    }

    handlePick () {
        let randomNum =  Math.floor(Math.random() * this.state.options.length)
        alert(this.state.options[randomNum] + " سلام٬ حاله شما چطوره؟ ")
    }

    render() {
        // const title = "Indecision App"
        const subtitle = "Put your life in the hands of a machine"

        return (
            <div>
                <Header  subtitle={subtitle} />
                <Action hasOptions = {this.state.options.length > 0}
                        handlePick = {this.handlePick}
                />
                <Options options={this.state.options}
                         handleDeleteOptions = {this.handleDeleteOptions}
                         handleDeleteOption = {this.handleDeleteOption}
                         />
                <AddOptions 
                        handleAddOptions = {this.handleAddOptions}
                        
                />
            </div>
        )
    }
}

IndecisionApp.defaultProps = {
    options : []
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            {props.subtitle && <h2>{props.subtitle}</h2>}
            <h2></h2>
        </div>
    )
}

Header.defaultProps = {
    title: "Indecision App"

}



const Action = (props) => {
    return (
        <div>
            <button 
            onClick={props.handlePick}
            disabled = {!props.hasOptions}
            >فشار دادن</button>
        </div>
    )

}

const Options = (props) => {
    return (
        <div>
            <button onClick={props.handleDeleteOptions}>remove All</button>
            {props.options.map((option) => <Option 
                key={option} 
                optiontext = {option}
                handleDeleteOption = {props.handleDeleteOption}
                />
            )}
        </div>
    )
}

const Option = (props) => {
    return (
        <div>
            {props.optiontext}
            <button 
                onClick={(e) => props.handleDeleteOption(props.optiontext)}
                >remove</button>
        </div>
    )
}




class AddOptions extends React.Component {
    constructor (props) {
        super(props)
        this.handleAddOptions = this.handleAddOptions.bind(this)
        this.state = {
            error: undefined
        }

    }

    handleAddOptions(e) {
        e.preventDefault() //prevents the full page from refreshing
  
        let option = e.target.elements.option.value.trim()
        let error = this.props.handleAddOptions(option)

        this.setState(() => ({error}))


        if(!error){
            e.target.elements.option.value = ""
        }
      
    }//
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOptions}>
                    <input type='text'  name= 'option'></input>
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

const appRoot = document.getElementById('app')



const jsx = (
    <div>
    <Header />
    <Action />
    <Options />
    </div>
)




ReactDOM.render(<IndecisionApp />,appRoot)