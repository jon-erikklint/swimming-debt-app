import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom"

import Balance from "./balance/Balance"

import CalculatorModel from "../models/CalculatorModel"

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            balance: 0,
            calculators: [new CalculatorModel("Asd", 0, 1), new CalculatorModel("Wasd", 0, 0.2), new CalculatorModel("Gasd", 0, -1)]
        }
    }

    handleAddition = (name, addition) => {
        this.updateCalculator(name, calculator => {
            const sum = calculator.sum + addition

            this.addBalance(calculator, addition)
    
            return {...calculator, sum, history: calculator.history.concat([addition])}
        })
    }

    updateCalculator(name, func) {
        const calculators = this.state.calculators
            .map(calculator => calculator.name == name ? func(calculator) : calculator)
        this.setState({calculators})
    }

    addBalance(calculator, amount) {
        const balance = this.state.balance + (amount * calculator.exchangeRatio);
        this.setState({balance})
    }

    render() {
        return (
        <Router>
            <Switch>
                <Route path="/calculator">
                    <div>moi</div>
                </Route>
                <Route path="/">
                    <Balance calculators={this.state.calculators}
                            balance={this.state.balance}
                            handleAddition={this.handleAddition}/>
                </Route>
            </Switch>
        </Router>
        )
    }
  
}
