import React from 'react';

export default function TableRow(props) {
    const {
        values,
        first,
        last
    } = props
    return (
        <tr>
            {createCell(first)}
            {values.map((value, index) => <td key={index}>{value}</td>)}
            {createCell(last)}
        </tr>
    )
}

const createCell = value => {
    return value === null || value === undefined
        ? null
        : <td>{value}</td>
}