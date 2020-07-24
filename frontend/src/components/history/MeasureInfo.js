import React from 'react';

export default function MeasureInfo(props) {
    const measure = props.measure
    return (
        <div>
            <div>Mittari: {measure.name}</div>
            <div>Vaihtosuhde: {measure.exchangeRatio}</div>
        </div>
    )
}