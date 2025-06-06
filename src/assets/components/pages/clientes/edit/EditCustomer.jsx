import React from 'react'
import { Container, Grid, Typography, Breadcrumbs, Link } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { EditCustomerForm } from './EditCustomerForm'
export function EditCustomer() {
    let { id } = useParams()

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
                navigate('/proyectos')
            }}
            style={{
                cursor: 'pointer',
            }}
        >
            Proyectos
        </Link>,
        <Typography key={3} style={{ fontWeight: 'bold' }}>
            Actualizar
        </Typography>,
    ]
    return (
        <>
            <Container maxWidth="xl" style={{ paddingTop: '40px' }}>
                <Grid
                    container
                    spacing={3}
                    flexDirection="column"
                    style={{ paddingBottom: '20px' }}
                >
                    <Grid item md={4} xs={12}>
                        <Typography
                            variant="h4"
                            style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                        >
                            Actualizar proyecto
                        </Typography>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <EditCustomerForm customerId={id} />
            </Container>
        </>
    )
}
