import React from 'react';

import MeasureInfo from './MeasureInfo';
import MeasureHistoryTable from "./MeasureHistoryTable"

export default function MeasureHistory(props) {
    return (<div>
        <MeasureInfo measure={props.measure}/>
        <MeasureHistoryTable measure={props.measure}/>
    </div>)
}