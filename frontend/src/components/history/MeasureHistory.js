import React from 'react';
import { useParams, Redirect } from "react-router-dom"

import MeasureInfo from './MeasureInfo';
import MeasureHistoryTable from "./MeasureHistoryTable"

export default function MeasureHistory(props) {
    const measureName = useParams().name
    const measure = props.measures.find(measure => measure.name === measureName)

    if(measure == null) return <Redirect to="/"/>

    return (<div>
        <MeasureInfo measure={measure}/>
        <MeasureHistoryTable measure={measure}/>
    </div>)
}