import React from 'react';
import { Link } from "react-router-dom"
import "./MeasureControl.css"

export default function MeasureControl(props) {
    const measure = props.measure

    return (
        <li>
            <Link to={"/measure/" + measure.name}>
                {measure.name}
            </Link>
            <span className="remove">
                Poista
            </span>
        </li>
    )
}