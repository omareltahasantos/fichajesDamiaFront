import React from 'react'
import { Container, Grid } from '@mui/material'
import { ImageForm } from './ImageForm'
import { TitlesForm } from './TitlesForm'
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
                <Grid container spacing={0}>
                    <Grid
                        item
                        md={12}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingBottom: 20,
                        }}
                    >
                        <ImageForm />
                    </Grid>
                    <TitlesForm />
                </Grid>
                <LoginForm />
            </Container>
        </>
    )
}
