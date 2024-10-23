import React from 'react'
import { TableRow, TableCell } from '@mui/material'

export function CustomerItems({ ...customer }) {
    return (
        <>
            <TableCell>{customer.name}</TableCell>
        </>
    )
}
