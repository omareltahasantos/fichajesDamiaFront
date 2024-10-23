import React from 'react'
import { Grid, Typography, Container, Link } from '@mui/material'
import { CardDashboard } from './CardDashboard'

export function DashbordBody() {
    const user = JSON.parse(sessionStorage.getItem('user'))

    return (
        <>
            <Container maxWidth="md" style={{ paddingTop: 50 }}>
                <Grid
                    container
                    spacing={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item md={12} xs={12}>
                        <Typography variant="h2" style={{ fontWeight: 'bold' }} align="center">
                            ¡Bienvenido a{' '}
                            <Link
                                href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&ved=2ahUKEwjmg9eCgLr5AhVH04UKHQ4bDu0QFnoECAgQAQ&url=http%3A%2F%2Fwww.sistemasmedioambientales.com%2F&usg=AOvVaw3K9cVRuZiiZAnLoPXo5K0C"
                                _blank
                                underline="hover"
                                color="#8BB925"
                            >
                                SM
                            </Link>
                            !
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={0}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    style={{ paddingTop: 50 }}
                >
                    <Grid item md={12} xs={12}>
                        <Typography variant="h5" align="center" color="GrayText">
                            Elige una de estas opciones:
                        </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={5} style={{ paddingTop: 50 }}>
                    <Grid item md={6} xs={12}>
                        <CardDashboard
                            title="Campañas"
                            description="Añade las campañas necesarias para tus proyectos"
                        />
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <CardDashboard
                            title="Horas"
                            description="Visualiza el registro de horas de los técnicos"
                        />
                    </Grid>
                </Grid>

                <Grid
                    container
                    spacing={5}
                    style={{ paddingTop: 50 }}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    {user.rol === 'COORDINADOR' && (
                        <Grid item md={6} xs={12}>
                            <CardDashboard
                                title="Fichar"
                                description="Registra el turno horario dependiendo tu campaña"
                            />
                        </Grid>
                    )}
                    {user.rol === 'ADMIN' || user.rol === 'CONTROL' ? (
                        <Grid item md={6} xs={12}>
                            <CardDashboard
                                title="Usuarios"
                                description="Añade los usuarios necesarios para tus proyectos"
                            />
                        </Grid>
                    ) : null}

                    {user.rol === 'CONTROL' && (
                        <Grid item md={6} xs={12}>
                            <CardDashboard
                                title="Clientes"
                                description="Añade los clientes necesarios para tus proyectos"
                            />
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    )
}
