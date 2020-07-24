import React from 'react';
import { Link } from "react-router-dom"

export default function MeasuresList(props) {
    return (
        <div>
            <h1>Mittarit</h1>
            <ul>
                {props.measures.map(measure => 
                    <li key={measure.name}><Link to={"/measure/" + measure.name}>{measure.name}</Link></li>
                )}
            </ul>
        </div>
    )
}