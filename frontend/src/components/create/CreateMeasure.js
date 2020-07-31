import React from 'react';

import EditForm from "../common/EditForm"
import TextField from "../common/TextField"

import redirectOnSubmit from "../hoc/redirectOnSubmit"

import MeasureModel from "../../models/MeasureModel"

import {validName, validFloat} from "../../helpers/validators"
import {formatFloat} from "../../helpers/formatters"

export function CreateMeasure(props) {
    const handleSubmit = obj => {
        const {name, sum, exchangeRatio} = obj
        const orderId = props.measures.reduce((max, current) => current.orderId > max ? current.orderId : max, -1) + 1

        const measure = new MeasureModel(name, sum, exchangeRatio, orderId)

        props.onSubmit(measure)
    }

    const components = [
        {
            label: "Nimi",
            field: "name",
            value: "",
            Component: TextField,
            editable: true,
            validator: (measures => name => validName(name, measures))(props.measures)
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
        <React.Fragment>
            <EditForm headerText="Luo uusi mittari"
                        submitText="Luo"
                        onSubmit={handleSubmit}
                        components={components}/>
        </React.Fragment>
    )
}

const CreateMeasureRedirect = redirectOnSubmit(CreateMeasure, "/measures")
export default CreateMeasureRedirect