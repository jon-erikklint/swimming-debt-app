import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom"

import LinkBar from "./LinkBar"
import Balance from "./balance/Balance"
import MeasureHistory from "./history/MeasureHistory"
import MeasuresList from "./measures/MeasuresList"
import CreateMeasure from "./create/CreateMeasure"
import EditMeasure from "./edit/EditMeasure"

import paramMeasureWrapper from "./hoc/paramMeasureWrapper"

import MeasureModel from "../models/MeasureModel"

const WrappedMeasureHistory = paramMeasureWrapper(MeasureHistory)

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

    updateMeasure(name, func) {
        const measures = this.state.measures
            .map(measure => measure.name == name ? func(measure) : measure)
        this.setState({measures})
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
                    <EditMeasure/>
                </Route>
                <Route path="/measure/new">
                    <CreateMeasure/>
                </Route>
                <Route path="/measure/:name">
                    <WrappedMeasureHistory measures={measures}/>
                </Route>
                <Route path="/measures">
                    <MeasuresList/>
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