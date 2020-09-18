import React from 'react';

import TableRow from "../common/TableRow"

export default function MeasureHistoryTable(props) {
    const {exchangeRatio, sum} = props.measure
    const measurements = props.measurements.map(measurement => measurement.value)
    const effectSum = sum * exchangeRatio

    const headers = measurements.map((item, index) => "Transaktio: " + (index + 1))

    const values = measurements
    const effectValues = measurements.map(item => item * exchangeRatio)

    let helpSum = 0
    const totals = measurements.map(item => {
        helpSum += item
        return helpSum
    })
    const totalEffects = totals.map(total => total * exchangeRatio)

    return (
        <table>
            <thead>
                <TableRow values={headers} first="" last="Total"/>
            </thead>
            <tbody>
                <TableRow values={values} first="Muutokset" last={sum}/>
                <TableRow values={effectValues} first="Reaalimuutokset" last={effectSum}/>
                <TableRow values={totals} first="Kokonaissummat" last={sum}/>
                <TableRow values={totalEffects} first="Reaalisummat" last={effectSum}/>
            </tbody>
        </table>
    )
}