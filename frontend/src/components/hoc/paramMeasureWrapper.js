import React from 'react';
import { useParams, Redirect } from "react-router-dom"

export default function paramMeasureWrapper(Component) {
    return function(props) {
        const measureName = useParams().name
        const measure = props.measures.find(measure => measure.name === measureName)
    
        if(measure == null) return <Redirect to="/"/>

        return <Component measure={measure} {...props}/>
    }
}