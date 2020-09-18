import React from 'react';

export default function TableRow(props) {
    const { values, first, last } = props

    return (
        <tr>
            {createCell(first)}
            {values.length > 0 ? values.map((value, index) => <td key={index}>{value}</td>) : null}
            {createCell(last)}
        </tr>
    )
}

const createCell = value => {
    return value === null || value === undefined
        ? null
        : <td>{value}</td>
}