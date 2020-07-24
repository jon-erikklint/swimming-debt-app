import React from 'react';
import { useParams } from "react-router-dom"

import MeasureInfo from './MeasureInfo';
import MeasureHistoryTable from "./MeasureHistoryTable"

export default function MeasureHistory(props) {
    const measureName = useParams().name
    const measure = props.measures.find(measure => measure.name === measureName)

    return (<div>
        <MeasureInfo measure={measure}/>
        <MeasureHistoryTable measure={measure}/>
    </div>)
}