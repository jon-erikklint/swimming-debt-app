import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom"
import axios from 'axios'

import LabeledText from "../common/LabeledText"
import TextField from "../common/TextField"
import LabeledCheckbox from "../common/LabeledCheckbox"
import EditForm from "../common/EditForm"

import redirectOnSubmit from "../hoc/redirectOnSubmit"

import {validFloat} from "../../helpers/validators"
import {formatFloat} from "../../helpers/formatters"

export function EditMeasure(props){
    const measureName = useParams().name
    const [measure, setMeasure] = useState(undefined)

    useEffect(() => {
        console.log("asd")
        axios.get("http://localhost:3001/api/measures/" + measureName)
            .then(response => {
                if(response.data != null && response.data !== "") setMeasure(response.data)
            })
    }, [])

    if (measure == null) return null

    const handleSubmit = obj => {
        const {reset, ...fields} = obj
        const alteredMeasure = {
            ...measure,
            ...fields
        }

        console.log(alteredMeasure)

        const promises = [axios.put("http://localhost:3001/api/measures/", alteredMeasure)]
        if (reset) promises.push(axios.delete("http://localhost:3001/api/measurements/" + measureName))

        axios.all(promises).then(axios.spread((...responses) => {
            console.log(responses[0])
            if(reset) console.log(responses[1])
        }))

        props.onSubmit(alteredMeasure)
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

const EditMeasureRedirect = redirectOnSubmit(EditMeasure, "/measures")
export default EditMeasureRedirect