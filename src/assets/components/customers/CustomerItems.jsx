import React from 'react'
import { TableRow, TableCell } from '@mui/material'

export function CustomerItems({ ...customer }) {
    const { name, active } = customer
    return (
        <>
            <TableCell>{name}</TableCell>
            <TableCell>{active ? 'ACTIVO' : 'INACTIVO'}</TableCell>
        </>
    )
}
