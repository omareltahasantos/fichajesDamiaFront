import React from 'react'
import { Grid, Typography } from '@mui/material'

export function DashbordTitlAndSubtitl() {
    return (
        <>
            <Grid container spacing={2} flexDirection="column" style={{ paddingBottom: '40px' }}>
                <Grid item md={3}>
                    <Typography
                        variant="h4"
                        style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                    >
                        Campañas
                    </Typography>
                </Grid>
                <Grid item md={5}>
                    <Typography>Selecciona la campaña a la que quieras imputar horas.</Typography>
                </Grid>
            </Grid>
        </>
    )
}
