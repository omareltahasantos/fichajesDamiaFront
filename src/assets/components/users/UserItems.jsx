import React from 'react'
import { TableCell } from '@mui/material'

export function UserItems({ ...user }) {
    return (
        <>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.dni}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{`${user.hours_contract}`}</TableCell>
            <TableCell>{user.rol}</TableCell>
            <TableCell>{user.estado}</TableCell>
        </>
    )
}
