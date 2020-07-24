import React from 'react';

import Calculator from "./Calculator"
import BalanceDisplay from "./BalanceDisplay"

export default function Balance(props) {
    const calculators = props.calculators

    return (
        <div>
            <BalanceDisplay balance={props.balance}/>
            <div>
                {calculators.map(calculator => <Calculator 
                    key={calculator.name} 
                    model={calculator}
                    handleAddition={props.handleAddition}/>)}
            </div>
        </div>
    )
}