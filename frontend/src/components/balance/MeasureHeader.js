import React from 'react';
import { Link } from "react-router-dom"
import "./MeasureHeader.css"

export default function MeasureHeader(props) {
    const measure = props.measure
    return (
        <div>
            <div>
                <Link to={"/measure/" + measure.name}><span className="nameLabel">
                    {measure.name}
                </span></Link>
                 - vaihtosuhde: {measure.exchangeRatio}</div>
            <div>Kokonaismäärä (kokonaisvaikutus): {measure.sum} ({measure.sum * measure.exchangeRatio})</div>
        </div>
    )
}