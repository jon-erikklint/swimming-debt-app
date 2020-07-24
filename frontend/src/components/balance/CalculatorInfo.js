import React from 'react';
import "./CalculatorInfo.css"

export default function CalculatorInfo(props) {
    const calculator = props.calculator
    return (
        <div>
            <div><span className="nameLabel">{calculator.name}</span> - vaihtosuhde: {calculator.exchangeRatio}</div>
            <div>Kokonaismäärä (kokonaisvaikutus): {calculator.sum} ({calculator.sum * calculator.exchangeRatio})</div>
        </div>
    )
}