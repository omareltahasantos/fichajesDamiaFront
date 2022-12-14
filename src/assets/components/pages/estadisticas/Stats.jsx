import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Grid, Typography, Breadcrumbs, Container, Link, Divider, Box } from '@mui/material'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { Footer } from '../../Footer'
import EventNoteIcon from '@mui/icons-material/EventNote'
import endpoint from '../../services/endpoint'

export function Stats() {
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
        <Typography style={{ fontWeight: 'bold' }}>Estadisticas campaña</Typography>,
    ]

    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        getCampaigns()
    }, [])

    const getCampaigns = async () => {
        let { data } = await axios.get(`${endpoint}campaigns`)

        if (data.length === 0) {
            return
        }

        setCampaigns(data)
    }

    const checkStatusDate = (date_end) => {
        let current_date = new Date()
        let year = current_date.getFullYear()
        let month = current_date.getMonth() + 1
        let day = current_date.getDate()

        if (month < 10) {
            month = `0${month}`
        }

        if (day < 10) {
            day = `0${day}`
        }

        current_date = `${year}-${month}-${day}`

        if (date_end < current_date) {
            return 'FINALIZADO'
        }

        return 'EN ACTIVO'
    }

    const handleCampaign = (id) => {
        navigate(`/estadisticas/${id}`)
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
                            Campañas
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>
                </Grid>
                {campaigns.length === 0 ? <Typography>No hay ninguna campaña</Typography> : ''}
                {campaigns.map((item) => (
                    <Box
                        component="button"
                        style={{
                            border: '1px solid #e0e0e0',
                            borderRadius: 10,
                            padding: 15,
                            backgroundColor: 'white',
                            width: '1150px',
                            marginBottom: '15px',
                            cursor: 'pointer',
                        }}
                        onClick={() => {
                            handleCampaign(item.id)
                        }}
                    >
                        <Typography
                            align="left"
                            variant="body1"
                            style={{
                                color:
                                    checkStatusDate(item.date_end) === 'EN ACTIVO'
                                        ? '#89ae45'
                                        : '#ee8383',
                            }}
                        >
                            {checkStatusDate(item.date_end)}
                        </Typography>
                        <Divider
                            style={{
                                marginTop: 5,
                                marginBottom: 10,
                                border: '1px solid #eceff1',
                            }}
                        />
                        <Box style={{ display: 'flex' }}>
                            <Divider
                                orientation="vertical"
                                flexItem
                                style={{
                                    border:
                                        checkStatusDate(item.date_end) === 'EN ACTIVO'
                                            ? '2px solid #89ae45'
                                            : '2px solid #ee8383',
                                    marginRight: '10px',
                                }}
                            />
                            <Typography align="left" variant="body1" fontWeight="bold">
                                {item.name}
                                <Typography align="left" variant="body2">
                                    {item.description}
                                </Typography>
                            </Typography>
                        </Box>
                        <Box style={{ display: 'flex' }}>
                            <Typography
                                align="left"
                                variant="body2"
                                paddingTop="20px"
                                display="flex"
                            >
                                <EventNoteIcon style={{ paddingRight: '5px' }} />
                                {`${item.date_start} - ${item.date_end}`}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Container>
            <Footer />
        </>
    )
}
