import React from 'react'
import { Container, Grid, Typography, IconButton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { UpdateHourForm } from './UpdateHourForm'

export function UpdateHour() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { campaignId } = useParams()
    const hourItem = state.hour

    return (
        <>
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
                                onClick={() => navigate(`/horas/${campaignId}`)}
                            >
                                <ArrowBackIcon />
                            </IconButton>
                            Editar turno
                        </Typography>
                    </Grid>

                    <Grid item md={4}>
                        <Typography variant="body1" style={{ fontFamily: 'sans-serif' }}>
                            Edita el turno de trabajo
                        </Typography>
                    </Grid>
                </Grid>

                <UpdateHourForm campaignId={campaignId} hour={hourItem} />
            </Container>
        </>
    )
}
