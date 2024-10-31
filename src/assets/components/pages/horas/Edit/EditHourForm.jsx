import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Grid, Typography, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router'
import endpoint from '../../../services/endpoint'

export function EditHourForm({ hourId, hourParams, customerId }) {
    const navigate = useNavigate()
    const { user, campaign, register_start, register_end } = hourParams
    const [hours, setHours] = useState(0)

    useEffect(() => {
        setHours(hourParams.hours)
    }, [hourParams])

    const editHours = async (e) => {
        e.preventDefault()
        let hours_obj = {
            hour_id: hourId,
            hours: hours,
            register_end: hourParams.register_end,
            ubication_end: hourParams.ubication_end,
        }

        let { data } = axios.get(`${endpoint}updateWork`, {
            params: hours_obj,
        })

        if (data === 'record failed!') {
            return
        }

        navigate(`/horas`, { state: { customerId: customerId } })
    }
    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={editHours}>
                <Grid container spacing={4} flexDirection="column">
                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">NOMBRE</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="Técnico/a"
                            variant="standard"
                            required
                            value={user}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">CAMPAÑA</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="Campaña"
                            variant="standard"
                            required
                            value={campaign}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">REGISTRO ENTRADA</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            value={register_start}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">REGISTRO SALIDA</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            value={register_end}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">HORAS REALIZADAS</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="horas realizadas"
                            variant="standard"
                            required
                            value={hours}
                            onChange={(e) => {
                                setHours(e.target.value)
                            }}
                            InputProps={{
                                readOnly: false,
                            }}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={0}>
                    <Grid item md={12} xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                margin: 'auto',
                                marginTop: '50px',
                                borderRadius: '10px',
                                backgroundColor: '#8bb925',
                            }}
                            fullWidth
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
