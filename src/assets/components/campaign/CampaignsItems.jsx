import React from 'react'
import { TableRow, TableCell } from '@mui/material'

export function CampaignsItems({ ...camp }) {
    const { name, description, date_start, date_end } = camp

    const reverseString = (string) => {
        return string.split('-').reverse().join('-')
    }

    return (
        <>
            <TableCell>{name}</TableCell>
            <TableCell>{description}</TableCell>
            <TableCell>{reverseString(date_start)}</TableCell>
            <TableCell>{reverseString(date_end)}</TableCell>
        </>
    )
}
