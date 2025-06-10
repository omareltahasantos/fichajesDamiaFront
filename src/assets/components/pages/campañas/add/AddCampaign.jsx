import React from 'react'
import { AppBarComponent } from '../../../appbar/AppBarComponent'
import { Footer } from '../../../Footer'
import { Container, Grid, Typography, Breadcrumbs, Link } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'
import { AddCampaignForm } from './AddCampaignForm'
export function AddCampaign() {
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
                navigate('/campaigns', { state: { customerId: location.state.customerId } })
            }}
            style={{
                cursor: 'pointer',
            }}
        >
            Proyectos - Campañas
        </Link>,
        <Typography style={{ fontWeight: 'bold' }}>Añadir</Typography>,
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
                    <Grid item md={3} xs={12}>
                        <Typography
                            variant="h4"
                            style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                        >
                            Añadir campaña
                        </Typography>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                <AddCampaignForm customerId={location.state.customerId} />
            </Container>
        </>
    )
}
