import React from 'react'
import { Button } from '@mui/material'

export function ButtonApp({
    text,
    type,
    styles,
    method,
    variant = 'standard',
    startIcon = '',
    color = '#bad80a',
    disabled = false,
    fullWidth = false,
}) {
    return (
        <>
            <Button
                fullWidth={fullWidth}
                type={type}
                variant={variant}
                onClick={method}
                startIcon={startIcon}
                disabled={disabled}
                sx={{
                    border: '1px solid color',
                    color: 'white',
                    fontSize: 12,
                    backgroundColor: color,
                    '&:hover': {
                        backgroundColor: color,
                        color: 'white',
                    },
                    ...styles,
                }}
            >
                {text}
            </Button>
        </>
    )
}
