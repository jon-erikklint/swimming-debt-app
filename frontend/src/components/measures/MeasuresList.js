import React from 'react';
import { Link } from "react-router-dom"

import measureService from "../../services/measureService"

import MeasureControl from "./MeasureControl"

import useFetchData from "../hooks/useFetchData"

export default function MeasuresList() {
    const [measures, updateMeasures] = useFetchData(() => measureService.getAll())

    const handleDelete = measure => {
        measureService.deleteOne(measure)
            .then(_ => {
                updateMeasures()
            })
    }

    const handleReorder = (measure, isUp) => {
        measureService.reorder(measure, isUp)
            .then(_ => {
                updateMeasures()
            })
    }

    if (measures === null) return ""

    const measureCount = measures.length

    return (
        <div>
            <h1>Mittarit</h1>
            <Link to="/measure/new">Luo uusi mittari</Link>
            <ul>
                {measures.map((measure, index) => 
                    <MeasureControl key={measure.name} 
                                    measure={measure}
                                    hasOrderUp={index > 0}
                                    hasOrderDown={index < measureCount - 1}
                                    onDelete={_ => handleDelete(measure)}
                                    onReorder={handleReorder}>
                    </MeasureControl>
                )}
            </ul>
        </div>
    )
}