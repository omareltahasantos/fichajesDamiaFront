import React from 'react'
import { TableRow, TableCell } from '@mui/material'

export function CampaignsItems({ ...camp }) {
    const reverseString = (string) => {
        let split = string.split('-')
        let reverse = split.reverse()
        let join = reverse.join('-')
        return join
    }
    return (
        <>
            <TableCell>{camp.name}</TableCell>
            <TableCell>{camp.description}</TableCell>
            <TableCell>{reverseString(camp.date_start)}</TableCell>
            <TableCell>{reverseString(camp.date_end)}</TableCell>
        </>
    )
}
