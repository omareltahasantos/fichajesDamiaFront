import React from 'react'
import { Grid, Typography } from '@mui/material'

export function TitlesForm() {
    return (
        <>
            <Grid
                item
                md={12}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: '30px',
                }}
            >
                <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                    ¡Bienvenido de vuelta!
                </Typography>
            </Grid>
            <Grid
                item
                md={12}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingBottom: 30,
                }}
            >
                <Typography variant="body1">Iniciar sesión</Typography>
            </Grid>
        </>
    )
}
