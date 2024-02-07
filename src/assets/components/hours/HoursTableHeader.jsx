import React from 'react'
import { TableCell } from '@mui/material'
import { SortColumn } from '../componentsApp/SortColumn'

export function HoursTableHeader({ hours, setHours }) {
    return (
        <>
            {/*
                <TableCell>{hour.user}</TableCell>
            <TableCell>{hour.campaign}</TableCell>
            <TableCell>{hour.register_start}</TableCell>
            <TableCell>
                <Link
                    href={`https://www.google.com/maps/place/${hour.ubication_start}`}
                    underline="none"
                    target="_blank"
                >
                    <OpenInNewIcon fontSize="small" />
                </Link>
            </TableCell>
            <TableCell>{hour.register_end}</TableCell>
            <TableCell>{hour.ubication_end}</TableCell>
            <TableCell>{hour.hours}</TableCell>
            <TableCell>{hour.type}</TableCell>
            <TableCell>{handleValidate(hour.validate)}</TableCell>
            
            */}

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
            <SortColumn column={'hours'} label={'HORAS'} state={hours} setMethod={setHours} />
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

            <TableCell style={{ fontWeight: 'bold', fontSize: '0.75rem' }}>ACCIONES</TableCell>
        </>
    )
}
