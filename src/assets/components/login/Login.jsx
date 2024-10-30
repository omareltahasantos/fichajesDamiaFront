import React from 'react'
import { Container, Grid, Typography } from '@mui/material'
import { ImageForm } from './ImageForm'
import { LoginForm } from './LoginForm'

export function Login() {
    return (
        <>
            <Container
                maxWidth="xs"
                sx={{
                    paddingTop: '30px',
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
                <LoginForm />
            </Container>
        </>
    )
}
