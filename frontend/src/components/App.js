import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom"

import LinkBar from "./LinkBar"
import Balance from "./balance/Balance"
import MeasureHistory from "./history/MeasureHistory"
import MeasuresList from "./measures/MeasuresList"
import CreateMeasureRedirect from "./create/CreateMeasure"
import EditMeasure from "./edit/EditMeasure"

import paramMeasureWrapper from "./hoc/paramMeasureWrapper"

import MeasureModel from "../models/MeasureModel"

const WrappedMeasureHistory = paramMeasureWrapper(MeasureHistory)
const WrappedEditMeasure = paramMeasureWrapper(EditMeasure)

export default class App extends React.Component {
    constructor(props) {
        super(props)

        const measures = [new MeasureModel("Asd", 0, 1, 0), new MeasureModel("Wasd", 0, 0.2, 1), new MeasureModel("Gasd", 0, -1, 2)]

        this.state = {
            measures
        }
    }

    handleAddition = (name, addition) => {
        this.updateMeasure(name, measure => {
            const sum = measure.sum + addition
    
            return {...measure, sum, history: measure.history.concat([addition])}
        })
    }

    handleEditMeasure = newMeasure => {
        this.updateMeasure(newMeasure.name, _ => newMeasure)
    }

    updateMeasure(name, func) {
        const measures = this.state.measures
            .map(measure => measure.name == name ? func(measure) : measure)
        this.setState({measures})
    }

    handleReorderMeasure = (measure, isUp) => {
        const measures = this.state.measures
        const index = measures.findIndex(measure2 => measure.name === measure2.name)

        let swapIndex = isUp
            ? (index === 0 ? index : index - 1)
            : (index === measures.length - 1 ? index : index + 1)

        if (index === swapIndex) return

        // järjestys-id:t
        const swapMeasure = measures[swapIndex]
        
        const tempId = swapMeasure.orderId
        swapMeasure.orderId = measure.orderId
        measure.orderId = tempId

        // render järjestää itse elementit orderin mukaan
        this.setState({measures: [...measures]})
    }

    handleAddMeasure = measure => {
        this.setState({measures: [...this.state.measures, measure]})
    }

    handleDeleteMeasure = measureToDelete => {
        this.setState({measures: this.state.measures.filter(measure => measure.name !== measureToDelete.name)})
    }

    render() {
        const measures = this.state.measures.sort((m1, m2) => m1.orderId - m2.orderId)
        const links = [
            {text: "Etusivu", link: "/"},
            {text: "Hallinnoi mittareita", link: "/measures"},
        ]

        return (
        <Router>
            <LinkBar links={links}/>

            <Switch>
                <Route path="/measure/edit/:name">
                    <WrappedEditMeasure measures={measures} onSubmit={this.handleEditMeasure}/>
                </Route>
                <Route path="/measure/new">
                    <CreateMeasureRedirect measures={measures} onSubmit={this.handleAddMeasure}/>
                </Route>
                <Route path="/measure/:name">
                    <WrappedMeasureHistory measures={measures}/>
                </Route>
                <Route path="/measures">
                    <MeasuresList measures={measures}
                                onDeleteMeasure={this.handleDeleteMeasure}
                                onReorderMeasure={this.handleReorderMeasure}/>
                </Route>
                <Route path="/">
                    <Balance measures={measures}
                            balance={this.state.measures.reduce((previous, current) => previous + (current.sum * current.exchangeRatio), 0)}
                            onAddition={this.handleAddition}/>
                </Route>
            </Switch>
        </Router>
        )
    }
  
}
