import React from 'react';

export default function LabeledText(props) {
    return (
        <div className="textField">
            <span className="fieldLabel">{props.label}:</span>
            <span>{props.value}</span>
        </div>
    )
}