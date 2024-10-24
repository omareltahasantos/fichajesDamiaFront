import React from 'react'
import { Footer } from '../../../Footer'
import { Container, Grid, Typography, Breadcrumbs, Link } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { AppBarComponent } from '../../../appbar/AppBarComponent'
import { AddCustomerForm } from './AddCustomerForm'

export function AddCustomer() {
    const navigate = useNavigate()
    const breadcrumb = [
        <Link
            underline="hover"
            key={1}
            color="inherit"
            onClick={() => {
                navigate('/')
            }}
            style={{
                cursor: 'pointer',
            }}
        >
            Home
        </Link>,
        <Link
            underline="hover"
            key={2}
            color="inherit"
            onClick={() => {
                navigate('/clientes')
            }}
            style={{
                cursor: 'pointer',
            }}
        >
            Clientes
        </Link>,
        <Typography key={3} style={{ fontWeight: 'bold' }}>
            Añadir
        </Typography>,
    ]
    return (
        <>
            <AppBarComponent />
            <Container style={{ paddingTop: '40px' }}>
                <Grid
                    container
                    spacing={3}
                    flexDirection="column"
                    style={{ paddingBottom: '40px' }}
                >
                    <Grid item md={3}>
                        <Typography
                            variant="h4"
                            style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                        >
                            Añadir cliente
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                {<AddCustomerForm />}
            </Container>
            <Footer />
        </>
    )
}
