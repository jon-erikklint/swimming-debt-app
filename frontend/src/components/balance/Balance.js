import React from 'react';

import Measure from "./Measure"
import BalanceDisplay from "./BalanceDisplay"

export default function Balance(props) {
    const measures = props.measures

    return (
        <div>
            <BalanceDisplay balance={props.balance}/>
            <div>
                {measures.map(measure => <Measure 
                    key={measure.name} 
                    measure={measure}
                    handleAddition={props.handleAddition}/>)}
            </div>
        </div>
    )
}