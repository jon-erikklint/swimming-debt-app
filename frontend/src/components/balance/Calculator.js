import React from 'react';
import "./Calculator.css"

import TextInput from "../common/TextInput"
import CalculatorInfo from "./CalculatorInfo"

export default class Calculator extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: "",
            errors: []
        }
    }

    handleTextChange = e => {
        const inputValue = e.target.value
        const isNumber = !isNaN(inputValue.replace(",", "."))

        const errors = []
        if(!isNumber) errors.push("Input ei ole numero")

        this.setState({errors, inputValue})
    }

    handleSubmit = e => {
        const value = this.state.inputValue.replace(",", ".")
        if(isNaN(value)) return;

        this.setState({inputValue: "", errors: []})
        this.props.handleAddition(this.props.model.name, parseFloat(value))
    }

    render() {
        const calculator = this.props.model

        return (
            <div className="calculator">
                <CalculatorInfo calculator={calculator}/>
                <TextInput 
                    inputValue={this.state.inputValue}
                    errors={this.state.errors}
                    handleTextChange={this.handleTextChange}
                    handleSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}