import React from 'react';

import TableRow from "../common/TableRow"

export default function MeasureHistoryTable(props) {
    const {exchangeRatio, valueSum} = props.measure
    const measurements = props.measurements.map(measurement => measurement.amount)
    const effectSum = valueSum * exchangeRatio

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
                <TableRow values={values} first="Muutokset" last={valueSum}/>
                <TableRow values={effectValues} first="Reaalimuutokset" last={effectSum}/>
                <TableRow values={totals} first="Kokonaissummat" last={valueSum}/>
                <TableRow values={totalEffects} first="Reaalisummat" last={effectSum}/>
            </tbody>
        </table>
    )
}