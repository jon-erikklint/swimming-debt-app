import React from 'react';
import "./TextInput.css"

import ErrorDisplay from "./ErrorDisplay"

export default function TextInput(props) {
    const errors = props.errors
    const anyErrors = errors.length > 0

    const onKeyUp = e => {
        if (e.key === "Enter") props.onSubmit()
    }

    return (
    <span className="textInput">
        <input 
            type="text" 
            value={props.inputValue} 
            onChange={props.onTextChange}
            onKeyUp={onKeyUp}
            className={anyErrors ? "erronous" : ""}/>
        <button disabled={anyErrors} onClick={props.onSubmit}>Lisää</button>
        <ErrorDisplay errors={errors}/>
    </span>
    )
}