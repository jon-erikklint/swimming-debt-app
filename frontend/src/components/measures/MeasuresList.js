import React from 'react';
import { Link } from "react-router-dom"

import MeasureControl from "./MeasureControl"

export default function MeasuresList(props) {
    return (
        <div>
            <h1>Mittarit</h1>
            <Link to="/measure/new">Luo uusi mittari</Link>
            <ul>
                {props.measures.map(measure => 
                    <MeasureControl key={measure.name} 
                                    measure={measure}
                                    onClick={e => props.onDeleteMeasure(measure)}>
                    </MeasureControl>
                )}
            </ul>
        </div>
    )
}