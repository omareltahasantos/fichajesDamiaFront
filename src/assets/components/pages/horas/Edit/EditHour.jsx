import React from 'react'
import { Container, Grid, Typography, Breadcrumbs, Link } from '@mui/material'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { EditHourForm } from './EditHourForm'
export function EditHour() {
    let { id } = useParams()

    const navigate = useNavigate()
    const location = useLocation()
    const breadcrumb = [
        <Link
            underline="hover"
            key="1"
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
            key="1"
            color="inherit"
            onClick={() => {
                navigate('/horas', { state: { customerId: location.state.customerId } })
            }}
            style={{
                cursor: 'pointer',
            }}
        >
            Horas
        </Link>,
        <Typography style={{ fontWeight: 'bold' }}>Actualizar</Typography>,
    ]
    return (
        <>
            <Container maxWidth="xl" style={{ paddingTop: '40px' }}>
                <Grid
                    container
                    spacing={3}
                    flexDirection="column"
                    style={{ paddingBottom: '40px' }}
                >
                    <Grid item md={4} xs={12}>
                        <Typography
                            variant="h4"
                            style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                        >
                            Actualizar fichaje
                        </Typography>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>
                </Grid>

                <EditHourForm
                    hourId={id}
                    hourParams={location.state.hour}
                    customerId={location.state.customerId}
                />
            </Container>
        </>
    )
}
