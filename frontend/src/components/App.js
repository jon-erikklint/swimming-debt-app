import React from 'react';
import {
    BrowserRouter as Router,
    Switch, Route
} from "react-router-dom"

import LinkBar from "./LinkBar"
import Balance from "./balance/Balance"
import MeasureHistory from "./history/MeasureHistory"
import MeasuresList from "./measures/MeasuresList"
import CreateMeasure from "./create/CreateMeasure"
import EditMeasure from "./edit/EditMeasure"

export default function App () {
    const links = [
        {text: "Etusivu", link: "/"},
        {text: "Hallinnoi mittareita", link: "/measures"},
    ]

    return (
    <Router>
        <LinkBar links={links}/>

        <Switch>
            <Route path="/measure/edit/:id">
                <EditMeasure/>
            </Route>
            <Route path="/measure/new">
                <CreateMeasure/>
            </Route>
            <Route path="/measure/:id">
                <MeasureHistory/>
            </Route>
            <Route path="/measures">
                <MeasuresList/>
            </Route>
            <Route path="/">
                <Balance/>
            </Route>
        </Switch>
    </Router>
    )
}