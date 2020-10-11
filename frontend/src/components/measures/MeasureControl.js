import React from 'react';
import { Link } from "react-router-dom"
import "./MeasureControl.css"

export default function MeasureControl(props) {
    const measure = props.measure

    function handleClick(e) {
        const answer = window.confirm("Haluatko varmasti poistaa mittarin \"" + measure.name + "\"?")
        if (answer) props.onDelete(e)
    }

    return (
        <li className="listedMeasure">
            <Link to={"/measure/" + measure.id}>
                {measure.name}
            </Link>
            <Link className="listElement" to={"/measure/edit/" + measure.id}>
                Muokkaa
            </Link>
            <span className="listElement clickable" onClick={handleClick}>
                Poista
            </span>
            <span className="listElement">
                Järjestä:

                {props.hasOrderUp 
                    ? (
                    <span className="listElementPart clickable"
                            onClick={e => props.onReorder(measure, true)}>
                        ^
                    </span>
                    )
                    : null
                }

                {props.hasOrderDown
                    ? (
                    <span className="listElementPart clickable"
                        onClick={e => props.onReorder(measure, false)}>
                        v
                    </span>
                    )
                    : null
                }
            </span>
        </li>
    )
}