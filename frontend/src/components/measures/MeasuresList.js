import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"

import measureService from "../../services/measureService"

import MeasureControl from "./MeasureControl"

export default function MeasuresList() {
    const [measures, setMeasures] = useState([])
    const measureCount = measures.length

    const fetchMeasures = () => {
        measureService.getAll()
            .then(response => {
                setMeasures(response.data)
            })
    }

    useEffect(fetchMeasures, [])

    const handleDelete = measure => {
        measureService.deleteOne(measure)
            .then(_ => {
                fetchMeasures()
            })
    }

    const handleReorder = (measure, isUp) => {
        measureService.reorder(measure, isUp)
            .then(_ => {
                fetchMeasures()
            })
    }

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