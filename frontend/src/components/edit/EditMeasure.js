import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom"
import axios from 'axios'

import LabeledText from "../common/LabeledText"
import TextField from "../common/TextField"
import LabeledCheckbox from "../common/LabeledCheckbox"
import EditForm from "../common/EditForm"

import {validFloat} from "../../helpers/validators"
import {formatFloat} from "../../helpers/formatters"

export function EditMeasure(){
    const measureName = useParams().name
    const [measure, setMeasure] = useState(undefined)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        axios.get("http://localhost:3001/api/measures/" + measureName)
            .then(response => {
                if(response.data != null && response.data !== "") setMeasure(response.data)
                else setRedirect(true)
            })
    }, [])

    if (redirect) return <Redirect to="/measures"/>
    if (measure == null) return <div>Loading</div>

    const handleSubmit = obj => {
        const {reset, ...fields} = obj
        const alteredMeasure = {
            ...measure,
            ...fields
        }

        const promises = [axios.put("http://localhost:3001/api/measures/", alteredMeasure)]
        if (reset) promises.push(axios.post("http://localhost:3001/api/measures/reset", alteredMeasure))

        axios.all(promises).then(axios.spread(() => {
            setRedirect(true)
        }))

        setMeasure(null)
    }

    const components = [
        {
            field: "name", 
            label: "Nimi",
            value: measure.name, 
            Component: LabeledText, 
            editable: false
        },
        {
            field: "exchangeRatio", 
            label: "Vaihtosuhde",
            value: "" + measure.exchangeRatio, 
            Component: TextField, 
            editable: true, 
            validator: validFloat,
            formatter: formatFloat
        },
        {
            field: "reset",
            label: "Nollaa",
            value: false,
            Component: LabeledCheckbox,
            editable: true,
            validator: () => null
        }
    ]

    return (
    <React.Fragment>
        <EditForm headerText="Muokkaa mittaria"
                    submitText="Päivitä"
                    components={components}
                    onSubmit={handleSubmit}/>
    </React.Fragment>)
}

export default EditMeasure