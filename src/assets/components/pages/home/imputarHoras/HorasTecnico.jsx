import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Grid, Typography, Button, Container, IconButton } from '@mui/material'
import axios from 'axios'
import { DisplayHoursStartDay } from '../../../../home_tecnicos/DisplayHoursStartDay'
import { DisplayHoursEndDay } from '../../../../home_tecnicos/DisplayHoursEndDay'
import endpoint from '../../../services/endpoint'

export function HorasTecnico() {
    const { campaign_id } = useParams()
    const navigate = useNavigate()
    const [hours, setHours] = useState([])
    const [unable, setUnable] = useState(true)

    useEffect(() => {
        hoursByCampaign()
    }, [])

    // useEffect(() => {
    //     let findSomeHoursNotFinished = hours.some((hour) => hour.register_end === null)

    //     setUnable(findSomeHoursNotFinished)
    // }, [hours])

    const hoursByCampaign = async () => {
        let { data } = await axios.get(`${endpoint}hoursByCampaign`, {
            params: {
                campaign_id: campaign_id,
                user_id: JSON.parse(sessionStorage.getItem('user')).id,
            },
        })

        if (data.length === 0) {
            setHours([])
            return
        }

        let lastHour = data.find((hour) => hour.register_end === null)

        if (lastHour) {
            data = data.filter((hour) => hour.register_end !== null)
            data.unshift(lastHour)
        }

        setHours(data)
    }

    const deleteHour = async (hour_id) => {
        await axios.delete(`${endpoint}hour/${hour_id}`)
        hoursByCampaign()
    }

    const registerFinalHours = async (hour_id) => {
        navigate(`/horas/edit/imputar/${campaign_id}`, { state: { hour_id: hour_id } })
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
                </Grid>
                <Grid container spacing={0}>
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
                                      <DisplayHoursEndDay deleteHour={deleteHour} {...item} />
                                  )
                              )
                            : ''}
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}
