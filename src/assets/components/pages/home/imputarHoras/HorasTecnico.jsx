import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Grid, Typography, Button, Container, IconButton } from '@mui/material'
import axios from 'axios'
import { DisplayHoursStartDay } from '../../../../home_tecnicos/DisplayHoursStartDay'
import { DisplayHoursEndDay } from '../../../../home_tecnicos/DisplayHoursEndDay'
import endpoint from '../../../services/endpoint'
import { CircularLoading } from '../../../componentsApp/CircularLoading'

export function HorasTecnico() {
    const { campaign_id } = useParams()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const [hours, setHours] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            hoursByCampaign()
        }, 1000)
    }, [])

    const hoursByCampaign = async () => {
        setIsLoading(true)
        await axios
            .get(`${endpoint}hoursByCampaign`, {
                params: {
                    campaign_id: campaign_id,
                    user_id: user.id,
                },
            })
            .then((response) => {
                if (response.data.length === 0) {
                    setHours([])
                    setIsLoading(false)
                    return
                }

                let hoursArray = response.data

                let lastHour = response.data.find((hour) => hour.register_end === null)

                if (lastHour) {
                    hoursArray = response.data.filter((hour) => hour.register_end !== null)
                    hoursArray.unshift(lastHour)
                }
                setHours([...hoursArray])
                setIsLoading(false)
            })
            .catch((error) => {
                console.log('Error', error)
            })
    }

    const deleteHour = async (hour_id) => {
        await axios.delete(`${endpoint}hour/${hour_id}`)
        hoursByCampaign()
    }

    const registerFinalHours = async (hour_id) => {
        navigate(`/horas/edit/imputar/${campaign_id}`, { state: { hour_id: hour_id } })
    }

    const updateHourView = (hour) => {
        navigate(`/horas/edit/technician/${campaign_id}`, { state: { hour: hour } })
    }

    return (
        <>
            <Container
                maxWidth="xl"
                style={{ paddingTop: '40px', paddingRight: '0px', paddingLeft: 0 }}
            >
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
                            <IconButton disableRipple onClick={() => navigate('/homeTecnicos')}>
                                <ArrowBackIcon />
                            </IconButton>
                            Mis fichajes
                        </Typography>
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
                            Organiza las horas trabajadas
                        </Typography>
                    </Grid>
                    {hours.some((hour) => hour.register_end === null) ? (
                        ''
                    ) : (
                        <Grid item md={3} xs={12}>
                            <Button
                                variant="contained"
                                style={{
                                    textTransform: 'none',
                                    fontSize: '16px',
                                    backgroundColor: '#8BB925',
                                }}
                                onClick={() => {
                                    navigate(`/horas/imputar/${campaign_id}`)
                                }}
                                disabled={hours.some((hour) => hour.register_end === null)}
                            >
                                <AddIcon /> Iniciar jornada
                            </Button>
                        </Grid>
                    )}
                </Grid>
                <Grid container spacing={0}>
                    {isLoading ? (
                        <CircularLoading />
                    ) : (
                        <Grid item md={12} xs={12}>
                            {hours.length !== 0
                                ? hours.map((item) =>
                                      item.register_end === null ? (
                                          <DisplayHoursStartDay
                                              registerFinalHours={registerFinalHours}
                                              deleteHour={deleteHour}
                                              {...item}
                                          />
                                      ) : (
                                          <DisplayHoursEndDay
                                              deleteHour={deleteHour}
                                              updateHourView={updateHourView}
                                              {...item}
                                          />
                                      )
                                  )
                                : ''}
                        </Grid>
                    )}
                </Grid>
            </Container>
        </>
    )
}
