import React from 'react'
import { TableCell, Link } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
export function HoursItems({ ...hour }) {
    function handleValidate(validate) {
        if (validate === '') return ''

        return validate === 'Si' ? 'Aceptada' : 'Denegada'
    }

    return (
        <>
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
            <TableCell>
                <Link
                    href={`https://www.google.com/maps/place/${hour.ubication_end}`}
                    underline="none"
                    target="_blank"
                >
                    <OpenInNewIcon fontSize="small" />
                </Link>
            </TableCell>
            <TableCell>{hour.hours}</TableCell>
            <TableCell>{hour.type}</TableCell>
            <TableCell>{handleValidate(hour.validate)}</TableCell>
            <TableCell>{hour.validate_by}</TableCell>
        </>
    )
}
