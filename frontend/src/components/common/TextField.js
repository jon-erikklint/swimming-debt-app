import React from 'react';
import "./TextField.css"

export default function TextField(props) {
    const {label, value, onChange, error} = props
    return (
        <div className="textField">
            <label>
                <span className="fieldLabel">{label}:</span>
                <input type="text"
                        value={value}
                        onChange={e => onChange(e.target.value)}
                        className={error ? "erronous" : ""}/>
                {error ? <span className="errorMessage">{error}</span> : null}
            </label>
        </div>
    )
}