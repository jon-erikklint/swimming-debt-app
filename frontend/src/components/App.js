import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom"

import LinkBar from "./LinkBar"
import Balance from "./balance/Balance"
import MeasureHistory from "./history/MeasureHistory"
import MeasuresList from "./measures/MeasuresList"

import MeasureModel from "../models/MeasureModel"

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            balance: 0,
            measures: [new MeasureModel("Asd", 0, 1), new MeasureModel("Wasd", 0, 0.2), new MeasureModel("Gasd", 0, -1)]
        }
    }

    handleAddition = (name, addition) => {
        this.updateMeasure(name, measure => {
            const sum = measure.sum + addition

            this.addBalance(measure, addition)
    
            return {...measure, sum, history: measure.history.concat([addition])}
        })
    }

    updateMeasure(name, func) {
        const measures = this.state.measures
            .map(measure => measure.name == name ? func(measure) : measure)
        this.setState({measures})
    }

    addBalance(measure, amount) {
        const balance = this.state.balance + (amount * measure.exchangeRatio);
        this.setState({balance})
    }

    render() {
        const measures = this.state.measures
        const links = [
            {text: "Etusivu", link: "/"},
            {text: "Mittarit", link: "/measures"},
        ]

        return (
        <Router>
            <LinkBar links={links}/>

            <Switch>
                <Route path="/measure/:name">
                    <MeasureHistory measures={measures}/>
                </Route>
                <Route path="/measures">
                    <MeasuresList measures={measures}/>
                </Route>
                <Route path="/">
                    <Balance measures={measures}
                            balance={this.state.balance}
                            handleAddition={this.handleAddition}/>
                </Route>
            </Switch>
        </Router>
        )
    }
  
}
