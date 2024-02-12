import React from 'react'
import { Grid, IconButton, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export function DashbordTitlAndSubtitl() {
    const navigate = useNavigate()
    return (
        <>
            <Grid container spacing={2} flexDirection="column" style={{ paddingBottom: '40px' }}>
                <Grid item md={3}>
                    <Typography
                        variant="h4"
                        style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                    >
                        <IconButton disableRipple onClick={() => navigate('/')}>
                            <ArrowBackIcon />
                        </IconButton>{' '}
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
