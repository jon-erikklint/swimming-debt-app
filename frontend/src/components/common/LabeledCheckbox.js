import React from 'react';

export default function LabeledCheckbox(props) {
    const {label, id, value, onChange, error} = props
    return (
        <div className="textField">
            <label>
                <span className="fieldLabel">{label}:</span>
                <input type="checkbox"
                        id={id}
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        className={error ? "erronous" : ""}/>
                {error ? <span className="errorMessage">{error}</span> : null}
            </label>
        </div>
    )
}