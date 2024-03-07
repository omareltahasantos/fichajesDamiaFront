import React from 'react'
import { TableRow, TableCell } from '@mui/material'

export function UserItems({ ...user }) {
    return (
        <>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{`${user.hours_contract}`}</TableCell>
            <TableCell>{user.rol}</TableCell>
            <TableCell>{user.estado}</TableCell>
        </>
    )
}
