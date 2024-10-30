import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography, IconButton, CircularProgress } from '@mui/material'
import { AppBarComponent } from '../../components/appbar/AppBarComponent'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Footer } from '../../components/Footer'
import { useParams, useNavigate } from 'react-router'
import { useGeolocated } from 'react-geolocated'
import axios from 'axios'
import endpoint from '../../components/services/endpoint'
import { AddHoursForm } from './AddHoursForm'
import { CircularLoading } from '../../components/componentsApp/CircularLoading'
import { AlertApp } from '../../components/componentsApp/AlertApp'

export function AddHours() {
    const navigate = useNavigate()
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
            <Container style={{ paddingTop: '40px' }}>
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
                            <IconButton
                                disableRipple
                                onClick={() => navigate(`/horas/${campaign_id}`)}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            Añadir horas
                        </Typography>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
                            Inicia la jornada de trabajo
                        </Typography>
                    </Grid>
                </Grid>

                {!isGeolocationAvailable ? (
                    <div>Your browser does not support Geolocation</div>
                ) : !isGeolocationEnabled ? (
                    <div>Geolocation is not enabled</div>
                ) : !coords ? (
                    <>
                        <AlertApp
                            severity={'warning'}
                            title={'Cargando coordenadas...'}
                            message={<CircularLoading />}
                        />
                    </>
                ) : (
                    <AddHoursForm
                        latitude={coords.latitude}
                        longitude={coords.longitude}
                        campaignName={currentCampaign}
                        currentUser={currentUser}
                        campaignId={campaign_id}
                    />
                )}
            </Container>
        </>
    )
}
