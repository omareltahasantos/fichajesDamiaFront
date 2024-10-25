import { Alert, AlertTitle } from '@mui/material'
import React from 'react'

export function AlertApp({ severity, title, message }) {
    return (
        <Alert severity={severity}>
            <AlertTitle>{title}</AlertTitle>
            {message}
        </Alert>
    )
}
