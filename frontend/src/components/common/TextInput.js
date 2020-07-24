import React from 'react';
import "./TextInput.css"

import ErrorDisplay from "./ErrorDisplay"

export default function TextInput(props) {
    const errors = props.errors
    const anyErrors = errors.length > 0

    const onKeyUp = e => {
        if (e.key === "Enter") props.handleSubmit()
    }

    return (
    <span className="textInput">
        <input 
            type="text" 
            value={props.inputValue} 
            onChange={props.handleTextChange}
            onKeyUp={onKeyUp}
            className={anyErrors ? "erronous" : ""}/>
        <button disabled={anyErrors} onClick={props.handleSubmit}>Lisää</button>
        <ErrorDisplay errors={errors}/>
    </span>
    )
}