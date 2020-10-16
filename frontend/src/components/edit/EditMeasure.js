import React, { useState } from 'react';
import { useParams, Redirect } from "react-router-dom"
import axios from 'axios'

import useFetchData from "../hooks/useFetchData"
import measureService from "../../services/measureService"

import LabeledText from "../common/LabeledText"
import TextField from "../common/TextField"
import LabeledCheckbox from "../common/LabeledCheckbox"
import EditForm from "../common/EditForm"

import {validFloat, validName} from "../../helpers/validators"
import {formatFloat} from "../../helpers/formatters"

export function EditMeasure(){
    const measureId = useParams().id
    const [measure, updateMeasure] = useFetchData(() => measureService.get(measureId))
    const [measures] = useFetchData(() => measureService.getAll())
    const [redirect, setRedirect] = useState(false)

    if (redirect) return <Redirect to="/measures"/>
    if (measure == null || measures == null) return <div>Loading</div>

    const filteredMeasures = measures.filter(me => me.id != measure.id)

    const handleSubmit = obj => {
        const {reset, ...fields} = obj
        const alteredMeasure = {
            ...measure,
            ...fields
        }

        const promises = [measureService.update(alteredMeasure)]
        if (reset) promises.push(measureService.reset(measureId))

        axios.all(promises).then(axios.spread(() => {
            setRedirect(true)
        }))

        updateMeasure(null)
    }

    const components = [
        {
            field: "name", 
            label: "Nimi",
            value: measure.name, 
            Component: TextField, 
            editable: true,
            validator: validName(filteredMeasures)
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
        <EditForm headerText="Muokkaa mittaria"
                submitText="Päivitä"
                components={components}
                onSubmit={handleSubmit}/>
    )
}

export default EditMeasure