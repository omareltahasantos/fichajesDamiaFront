import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography, IconButton } from '@mui/material'
import { AppBarComponent } from '../../components/appbar/AppBarComponent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Footer } from '../../components/Footer'
import { useParams, useNavigate, useLocation } from 'react-router'
import { useGeolocated } from 'react-geolocated'
import axios from 'axios'
import { EditWorkHourForm } from './EditWorkHourForm'
import endpoint from '../../components/services/endpoint'

export function EditWorkHour() {
    const navigate = useNavigate()
    const location = useLocation()
    const { campaign_id } = useParams()
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    })
    const [currentCampaign, setCurrentCampaign] = useState('')
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))

    useEffect(() => {
        currentCampaignMethod()
    }, [])

    const currentCampaignMethod = async () => {
        let { data } = await axios.get(`${endpoint}campaign/${campaign_id}`)

        setCurrentCampaign(data.name)
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
                    <Grid item md={4}>
                        <Typography
                            variant="h4"
                            style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                        >
                            <IconButton
                                disableRipple
                                onClick={() => navigate(`/horas/${campaign_id}`)}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            Añadir horas
                        </Typography>
                    </Grid>
                    <Grid item md={4}>
                        <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
                            Imputa las horas que has realizado
                        </Typography>
                    </Grid>
                </Grid>

                {!isGeolocationAvailable ? (
                    <div>Your browser does not support Geolocation</div>
                ) : !isGeolocationEnabled ? (
                    <div>Geolocation is not enabled</div>
                ) : coords ? (
                    <EditWorkHourForm
                        latitude={coords.latitude}
                        longitude={coords.longitude}
                        campaignName={currentCampaign}
                        currentUser={currentUser}
                        campaignId={campaign_id}
                        hourId={location.state.hour_id}
                    />
                ) : (
                    ''
                )}
            </Container>
            <Footer />
        </>
    )
}
