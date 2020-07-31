import React from 'react';

import LabeledText from "../common/LabeledText"
import TextField from "../common/TextField"
import LabeledCheckbox from "../common/LabeledCheckbox"
import EditForm from "../common/EditForm"

import redirectOnSubmit from "../hoc/redirectOnSubmit"

import {validFloat} from "../../helpers/validators"
import {formatFloat} from "../../helpers/formatters"

export function EditMeasure(props){
    const measure = props.measure

    const handleSubmit = obj => {
        const {reset, ...fields} = obj
        const alteredMeasure = {
            ...measure,
            ...fields
        }

        if(reset) {
            alteredMeasure.sum = 0
            alteredMeasure.history = [0]
        }

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