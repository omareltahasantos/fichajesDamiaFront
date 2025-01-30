import React, { useState, useEffect } from 'react'
import { Container, Grid, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams, useNavigate, useLocation } from 'react-router'
import { useGeolocated } from 'react-geolocated'
import axios from 'axios'
import { EditWorkHourForm } from './EditWorkHourForm'
import endpoint from '../../components/services/endpoint'
import { CircularLoading } from '../../components/componentsApp/CircularLoading'
import { AlertApp } from '../../components/componentsApp/AlertApp'

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
            {' '}
            <Container maxWidth="xl" style={{ paddingTop: '40px' }}>
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
                            Finalizar turno
                        </Typography>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <hr style={{ border: '1px solid #8BB925', width: '100%' }} />
                        <AlertApp
                            title={'Información importante al imputar horas'}
                            message={
                                'Las horas no enteras se deben imputar como 0,25 - 0,50 - 0,75. De lo contrario, se invalidarán.'
                            }
                            severity={'info'}
                        />
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
                ) : !coords ? (
                    <>
                        <AlertApp
                            severity={'warning'}
                            title={'Cargando coordenadas...'}
                            message={<CircularLoading />}
                        />
                    </>
                ) : (
                    <EditWorkHourForm
                        latitude={coords.latitude}
                        longitude={coords.longitude}
                        campaignName={currentCampaign}
                        currentUser={currentUser}
                        campaignId={campaign_id}
                        hourId={location.state.hour_id}
                    />
                )}
            </Container>
        </>
    )
}
