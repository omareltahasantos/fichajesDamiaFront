import React from 'react'
import { TableRow, TableCell } from '@mui/material'

export function CustomerItems({ ...customer }) {
    const { name, code, active } = customer
    return (
        <>
            <TableCell>{name}</TableCell>
            <TableCell>{code}</TableCell>
            <TableCell>{active ? 'ACTIVO' : 'INACTIVO'}</TableCell>
        </>
    )
}
