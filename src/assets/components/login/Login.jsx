import React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { ImageForm } from './ImageForm'
import { LoginForm } from './LoginForm'
import { useLocation } from 'react-router-dom'

export function Login() {
    const location = useLocation()

    // Use URLSearchParams to parse the query string
    const queryParams = new URLSearchParams(location.search)
    const dni = queryParams.get('dni')
    const password = queryParams.get('password')

    return (
        <>
            <Container
                maxWidth="xs"
                sx={{
                    paddingTop: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '60vh',
                }}
                component="form"
            >
                <Grid container spacing={0} justifyContent={'center'}>
                    <Grid
                        item
                        md={12}
                        xs={12}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: 20,
                        }}
                    >
                        <ImageForm />
                    </Grid>
                    <Grid
                        item
                        md={12}
                        xs={12}
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
                        xs={12}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: 30,
                        }}
                    >
                        <Typography variant="body1">Iniciar sesión</Typography>
                    </Grid>
                </Grid>
                <LoginForm paramsToLog={{ dni, password }} />
            </Container>
        </>
    )
}
