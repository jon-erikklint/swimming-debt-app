import React from 'react';

export default function ErrorDisplay(props) {
    const errors = props.errors
    if(errors == null || errors.length === 0) return null;

    return (
        <span>
            {props.errors.map(error => (<span key={error}>Virhe: {error}</span>))}
        </span>
    )
}