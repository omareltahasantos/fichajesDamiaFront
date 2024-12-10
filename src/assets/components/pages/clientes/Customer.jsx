import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Grid, Typography, Breadcrumbs, Button, Container, Link, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import endpoint from '../../services/endpoint'
import { CardCampaign } from '../../campaign/CardCampaign'
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
            Proyectos
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
            <Container maxWidth="xl" style={{ paddingTop: '40px' }}>
                <Grid
                    container
                    spacing={3}
                    flexDirection="column"
                    style={{ paddingBottom: '20px' }}
                >
                    <Grid item md={3} xs={12}>
                        <Typography
                            variant="h4"
                            style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                        >
                            Proyectos
                        </Typography>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Button
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                fontSize: '16px',
                                backgroundColor: '#8BB925',
                            }}
                            onClick={() => {
                                navigate('/proyectos/add')
                            }}
                        >
                            <AddIcon /> Añadir proyectos
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12}>
                        <CardCampaign title="Total proyectos" description={countCustomers} />
                    </Grid>
                </Grid>
                <Divider style={{ marginTop: 20, marginBottom: 20, border: '2px solid #b9d47b' }} />
                <CustomerTable
                    getCountCustomers={getCountCustomers}
                    countCustomers={countCustomers}
                />
            </Container>
        </>
    )
}
