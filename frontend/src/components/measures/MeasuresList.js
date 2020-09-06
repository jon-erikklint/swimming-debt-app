import React, {useEffect, useState} from 'react';
import { Link } from "react-router-dom"

import axios from 'axios'

import MeasureControl from "./MeasureControl"

export default function MeasuresList() {
    const [measures, setMeasures] = useState([])
    const measureCount = measures.length

    const fetchMeasures = () => {
        axios.get("http://localhost:3001/api/measures")
            .then(response => {
                setMeasures(response.data)
            })
    }

    useEffect(fetchMeasures, [])

    const handleDelete = measure => {
        axios.delete("http://localhost:3001/api/measures/" + measure.name)
            .then(_ => {
                fetchMeasures()
            })
    }

    const handleReorder = (measure, isUp) => {
        axios.post("http://localhost:3001/api/measures/reorder", {measureName: measure.name, up: isUp})
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