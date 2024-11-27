import React from 'react'
import { TableCell } from '@mui/material'
import { SortColumn } from '../componentsApp/SortColumn'

export function HoursTableHeader({ hours, setHours }) {
    return (
        <>
            <SortColumn column={'user'} label={'TECNICO'} state={hours} setMethod={setHours} />
            <SortColumn column={'campaign'} label={'CAMPAÑA'} state={hours} setMethod={setHours} />
            <SortColumn
                column={'register_start'}
                label={'REG.INICIO'}
                state={hours}
                setMethod={setHours}
            />
            <SortColumn
                column={'ubication_start'}
                label={'UBI.INICIO'}
                state={hours}
                setMethod={setHours}
            />
            <SortColumn
                column={'register_end'}
                label={'REG.FINAL'}
                state={hours}
                setMethod={setHours}
            />
            <SortColumn
                column={'ubication_end'}
                label={'UBI.FINAL'}
                state={hours}
                setMethod={setHours}
            />
            <SortColumn
                column={'hours'}
                label={'HORAS IMPUTADAS'}
                state={hours}
                setMethod={setHours}
            />
            <SortColumn
                column={'worked_hours'}
                label={'HORAS TRABAJADAS'}
                state={hours}
                setMethod={setHours}
            />
            <SortColumn column={'type'} label={'TIPO'} state={hours} setMethod={setHours} />
            <SortColumn
                column={'validate'}
                label={'VALIDACIONES'}
                state={hours}
                setMethod={setHours}
            />
            <SortColumn
                column={'validate_by'}
                label={'VALIDADO POR'}
                state={hours}
                setMethod={setHours}
            />

            <TableCell style={{ fontWeight: 'bold', fontSize: '10px' }}>ACCIONES</TableCell>
        </>
    )
}
