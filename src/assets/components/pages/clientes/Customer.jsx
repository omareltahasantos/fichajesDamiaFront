import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Grid, Typography, Breadcrumbs, Button, Container, Link, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import endpoint from '../../services/endpoint'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { CardCampaign } from '../../campaign/CardCampaign'
import { Footer } from '../../Footer'
import { CustomerTable } from '../../customers/CustomerTable'

export function Customer() {
    const navigate = useNavigate()
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
        <Typography key={2} style={{ fontWeight: 'bold' }}>
            Clientes
        </Typography>,
    ]

    const [countCustomers, setCountCustomers] = useState(null)

    useEffect(() => {
        getCountCustomers()
    }, [])

    const getCountCustomers = async () => {
        let { data } = await axios.get(`${endpoint}countCustomers`)

        setCountCustomers(data)
    }

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
                            Clientes
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>
                    <Grid item md={3}>
                        <Button
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                fontSize: '16px',
                                backgroundColor: '#8BB925',
                            }}
                            onClick={() => {
                                navigate('/clientes/add')
                            }}
                        >
                            <AddIcon /> Añadir clientes
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item md={12}>
                        <CardCampaign title="Total clientes" description={countCustomers} />
                    </Grid>
                </Grid>
                <Divider style={{ marginTop: 50, marginBottom: 30, border: '2px solid #b9d47b' }} />
                <CustomerTable
                    getCountCustomers={getCountCustomers}
                    countCustomers={countCustomers}
                />
            </Container>
            <Footer />
        </>
    )
}
