import React from 'react'
import { TableCell, IconButton, Link } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
export function HoursItems({ ...hour }) {
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
            <TableCell>{hour.ubication_end}</TableCell>
            <TableCell>{hour.hours}</TableCell>
            <TableCell>{hour.type}</TableCell>
            <TableCell>{hour.validate}</TableCell>
        </>
    )
}
