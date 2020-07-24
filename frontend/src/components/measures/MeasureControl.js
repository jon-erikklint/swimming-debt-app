import React from 'react';
import { Link } from "react-router-dom"
import "./MeasureControl.css"

export default function MeasureControl(props) {
    const measure = props.measure

    function handleClick(e) {
        const answer = window.confirm("Haluatko varmasti poistaa mittarin \"" + measure.name + "\"?")
        if (answer) props.onClick(e)
    }

    return (
        <li className="listedMeasure">
            <Link to={"/measure/" + measure.name}>
                {measure.name}
            </Link>
            <span className="remove" onClick={handleClick}>
                Poista
            </span>
        </li>
    )
}