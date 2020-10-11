import React, {useState} from 'react';
import { Redirect } from "react-router-dom"

import EditForm from "../common/EditForm"
import TextField from "../common/TextField"

import {validName, validFloat} from "../../helpers/validators"
import {formatFloat} from "../../helpers/formatters"

import useFetchData from "../hooks/useFetchData"
import measureService from "../../services/measureService"

export function CreateMeasure() {
    const [redirect, setRedirect] = useState(false)
    const [measures] = useFetchData(() => measureService.getAll())

    const handleSubmit = obj => {
        const {name, sum, exchangeRatio} = obj

        const measure = {
            name, exchangeRatio, startValue: sum
        }
        measureService.create(measure)
            .then(res => {
                if (res.status === 200) {
                    setRedirect(true)
                    return
                }
            })
    }

    if (redirect) return <Redirect to="/measures"/>
    if (measures == null) return (<div>Loading</div>)

    const components = [
        {
            label: "Nimi",
            field: "name",
            value: "",
            Component: TextField,
            editable: true,
            validator: (measures => name => validName(name, measures))(measures)
        },
        {
            label: "Vaihtosuhde",
            field: "exchangeRatio",
            value: "1",
            Component: TextField,
            editable: true,
            validator: validFloat,
            formatter: formatFloat
        },
        {
            label: "Alkusumma",
            field: "sum",
            value: "0",
            Component: TextField,
            editable: true,
            validator: validFloat,
            formatter: formatFloat
        }
    ]

    return (
        <EditForm headerText="Luo uusi mittari"
                submitText="Luo"
                onSubmit={handleSubmit}
                components={components}/>
    )
}

export default CreateMeasure