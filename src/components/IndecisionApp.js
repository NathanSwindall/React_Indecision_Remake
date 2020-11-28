import React from 'react';
import ChooseButton from '../components/ChooseButton'
import Header from '../components/Header'
import AddOptions from '../components/AddOptions'
import RemoveAll from '../components/RemoveAll'
import Options from '../components/Options'

class IndecisionApp extends React.Component {
    constructor(props){
        super(props)
        this.title = "Indecision App"
        this.state = {
            options: props.options,
            error: undefined
        }
        
        //bindings so we don't lose this structure
        this.handlePick = this.handlePick.bind(this)
        this.handleForm = this.handleForm.bind(this)
        this.handleRemoveAll = this.handleRemoveAll.bind(this)
        this.handleDeleteOption = this.handleDeleteOption.bind(this)
        this.handleError = this.handleError.bind(this)
        this.getErrorState = this.getErrorState.bind(this)
    }


    handlePick(){
        if(this.state.options.length > 0)
        {
            const ran = Math.floor(Math.random()*this.state.options.length)
            alert(this.state.options[ran])
            console.log(ran)
        }

    }

    // This method will handle new options being added to the form
    handleForm(option){
        if(option === ""){
            return "This is a blank response. Please enter a new response"
        }
        else if(this.state.options.indexOf(option) > -1){
            return "There is already this entry"
        }
        this.setState((prevState)=> ({
            options : prevState.options.concat(option)
        }))
    }

    handleRemoveAll(){
        this.setState(()=>({
            options : [],
            error: undefined
        }))
    }

    handleError(errorText) {
        this.setState((prevState) => ({
            error: errorText
        }))
    }

    getErrorState(){
        return this.state.error
    }

    handleDeleteOption(optiontext){
        this.setState((prevState) => ({
            options: prevState.options.filter((option) => option !== optiontext) // this should be in {} because it will not work
        }))

    }


    //Make the app persistant
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

   

    render(){
        return (
        <div>
            <Header title={this.title}/>
            <ChooseButton hasOptions={this.state.options.length > 0} 
                          handlePick={this.handlePick}/>
            <RemoveAll handleRemoveAll={this.handleRemoveAll} 
                        handleError={this.handleError}/>
            <Options options={this.state.options}
                      handleDeleteOption={this.handleDeleteOption}/>
            <AddOptions handleForm={this.handleForm}
                        handleError={this.handleError}
                        getErrorState={this.getErrorState}/>
        </div>
        )
    }

    
}

IndecisionApp.defaultProps = {
    options : []
}

export default IndecisionApp