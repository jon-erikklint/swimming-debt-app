import React from 'react';
import "./Measure.css"

import TextInput from "../common/TextInput"
import MeasureHeader from "./MeasureHeader"

export default class Measure extends React.Component {
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
        const value = this.state.inputValue.replace(",", ".").trim()
        if(value === "" || isNaN(value)) return;

        this.setState({inputValue: "", errors: []})
        this.props.onAddition(this.props.measure.name, parseFloat(value))
    }

    render() {
        const measure = this.props.measure

        return (
            <div className="measure">
                <MeasureHeader measure={measure}/>
                <TextInput 
                    inputValue={this.state.inputValue}
                    errors={this.state.errors}
                    onTextChange={this.handleTextChange}
                    onSubmit={this.handleSubmit}
                />
            </div>
        )
    }
}