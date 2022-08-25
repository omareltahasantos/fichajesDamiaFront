import React from 'react'
import { TableCell } from '@mui/material'

export function HoursTableHeader() {
    return (
        <>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>TECNICO</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
                {'Campaña'.toUpperCase()}
            </TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>REG.INICIO</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>UBI.INICIO</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>REG.FINAL</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>UBI.FINAL</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>HORAS</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>TIPO</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>VALIDACIONES</TableCell>
            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>ACCIONES</TableCell>
        </>
    )
}
