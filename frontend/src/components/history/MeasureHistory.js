import React, { useState } from 'react';
import { useParams } from "react-router-dom"

import MeasureInfo from './MeasureInfo';
import MeasureHistoryTable from "./MeasureHistoryTable"

import useMultifetchData from "../hooks/useMultifetchData"
import measureService from "../../services/measureService"
import measurementService from "../../services/measurementService"

export default function MeasureHistory() {
    const measureId = useParams().id
    const [[measure, measurements], _] = useMultifetchData(measureService.get(measureId), measurementService.get(measureId))

    console.log(measure, measurements)

    if (measure == null || measurements == null) return <div>Loading</div>

    return (<div>
        <MeasureInfo measure={measure}/>
        <MeasureHistoryTable measure={measure} measurements={measurements}/>
    </div>)
}