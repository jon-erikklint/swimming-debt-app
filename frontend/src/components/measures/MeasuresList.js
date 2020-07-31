import React from 'react';
import { Link } from "react-router-dom"

import MeasureControl from "./MeasureControl"

export default function MeasuresList(props) {
    const measureCount = props.measures.length
    return (
        <div>
            <h1>Mittarit</h1>
            <Link to="/measure/new">Luo uusi mittari</Link>
            <ul>
                {props.measures.map((measure, index) => 
                    <MeasureControl key={measure.name} 
                                    measure={measure}
                                    hasOrderUp={index > 0}
                                    hasOrderDown={index < measureCount - 1}
                                    onDelete={e => props.onDeleteMeasure(measure)}
                                    onReorder={props.onReorderMeasure}>
                    </MeasureControl>
                )}
            </ul>
        </div>
    )
}