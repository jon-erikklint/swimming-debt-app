import React from 'react';

import TableRow from "../common/TableRow"

export default function MeasureHistoryTable(props) {
    const {history, exchangeRatio, sum} = props.measure
    const effectSum = sum * exchangeRatio

    const headers = history.map((item, index) => "Transaktio: " + (index + 1))

    const values = history
    const effectValues = history.map(item => item * exchangeRatio)

    let helpSum = 0
    const totals = history.map(item => {
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