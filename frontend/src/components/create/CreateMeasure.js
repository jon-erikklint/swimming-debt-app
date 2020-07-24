import React from 'react';
import { Redirect } from "react-router-dom"

import TextField from "../common/TextField"

import MeasureModel from "../../models/MeasureModel"

export default class CreateMeasure extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            exchangeRatio: "",
            sum: "0",

            redirect: false
        }
    }

    handleChange(type, value) {
        const obj = {}
        obj[type] = value
        this.setState(obj)
    }

    handleSubmit = e => {
        const name = this.state.name
        const sum = parseFloat(this.state.sum.replace(",", ".").trim())
        const exchangeRatio = parseFloat(this.state.exchangeRatio.replace(",", ".").trim())

        const measure = new MeasureModel(name, sum, exchangeRatio)

        this.setState({redirect: true})

        this.props.onAddMeasure(measure)
    }

    render() {
        if (this.state.redirect) return <Redirect to="/measures"/>

        const nameError = validName(this.state.name, this.props.measures)
        const ratioError = validFloat(this.state.exchangeRatio)
        const sumError = validFloat(this.state.sum)

        const allValid = !nameError && !ratioError && !sumError

        return (
            <div>
                <h1>Luo uusi mittari</h1>
                <TextField label="Nimi" 
                            value={this.state.name} 
                            onChange={val => this.handleChange("name", val)}
                            error={nameError}/>
                <TextField label="Vaihtosuhde" 
                            value={this.state.exchangeRatio} 
                            onChange={val => this.handleChange("exchangeRatio", val)}
                            error={ratioError}/>
                <TextField label="Alkusumma" 
                            value={this.state.sum} 
                            onChange={val => this.handleChange("sum", val)}
                            error={sumError}/>
                <button disabled={!allValid} onClick={this.handleSubmit}>Luo</button>
            </div>
        )
    }
}

function validName(name, measures) {
    if(name === null || name === undefined || name.length === 0) return "Nimi ei saa olla tyhjä";

    return measures.find(measure => measure.name === name) == null ? null : "Mittari " + name + " on jo olemassa"
}

function validFloat(text) {
    if(text === null || text === undefined) return "Syötä luku";

    text = text.replace(",", ".").trim()

    if(text.length === 0) return "Syötä luku"

    return isNaN(text) ? "Syötetty teksti ei ole luku" : null
}