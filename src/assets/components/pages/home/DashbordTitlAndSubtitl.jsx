import React from 'react'
import { Breadcrumbs, Grid, IconButton, Link, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export function DashbordTitlAndSubtitl() {
    const navigate = useNavigate()
    const user = JSON.parse(sessionStorage.getItem('user'))

    const breadcrumb = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            onClick={() => {
                navigate('/')
            }}
        >
            Home
        </Link>,
        <Typography style={{ fontWeight: 'bold' }}>Proyectos - Campañas</Typography>,
    ]
    return (
        <>
            <Grid container spacing={2} flexDirection="column" style={{ paddingBottom: '10px' }}>
                {user.rol !== 'TECNICO' && (
                    <Grid item md={9}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>
                )}
                <Grid item md={5}>
                    <Typography>
                        Selecciona el proyecto - campaña a la que quieras imputar horas.
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
