import React from 'react';

import Measure from "./Measure"
import BalanceDisplay from "./BalanceDisplay"

import measureService from "../../services/measureService"
import measurementService from "../../services/measurementService"
import useFetchData from "../hooks/useFetchData"

export default function Balance() {
    const [measures, updateMeasures] = useFetchData(() => measureService.getAll())

    if (measures == null) return <div>Loading</div>

    const balance = measures.reduce((total, current) => total + (current.sum * current.exchangeRatio), 0)

    const handleAddition = (name, addition) => {
        measurementService.create(name, addition)
            .then(res => {
                if(res.status === 200) updateMeasures()
            })
    }

    return (
        <div>
            <BalanceDisplay balance={balance}/>
            <div>
                {measures.map(measure => <Measure 
                    key={measure.name} 
                    measure={measure}
                    onAddition={handleAddition}/>)}
            </div>
        </div>
    )
}