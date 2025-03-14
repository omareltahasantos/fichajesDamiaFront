import React, { useState } from 'react'
import axios from 'axios'
import { Box, Grid, Typography, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router'
import { DropdownApp } from '../../../componentsApp/DropdownApp'
import endpoint from '../../../services/endpoint'

const typeHours = [
    {
        value: 'normales',
        label: 'Normales',
    },
    {
        value: 'nocturnas',
        label: 'Nocturnas',
    },
    {
        value: 'festivas',
        label: 'Festivas',
    },
    {
        value: 'horas extras',
        label: 'Horas extras',
    },
]

export function UpdateHourForm({ campaignId, ...hour }) {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    const [hours, setHours] = useState(hour.hour.hours)
    const [type, setType] = useState(hour.hour.type)

    const editHours = async (e) => {
        e.preventDefault()

        let parseHours = hours.toString().includes(',') ? hours.replace(',', '.') : hours

        let hours_obj = {
            hour_id: hour.hour.id,
            register_end: hour.hour.register_end,
            ubication_end: hour.hour.ubication_end,
            hours: Number(parseHours),
            type_hours: type,
        }

        let { data } = axios.get(`${endpoint}updateWork`, {
            params: hours_obj,
        })

        if (data === 'record failed!') {
            return
        }

        navigate(`/horas/${campaignId}`)
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
                            value={user.name}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">Fecha entrada</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            value={hour.hour.register_start}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">Fecha salida</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            value={hour.hour.register_end}
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
                            placeholder="Introduce las horas realizadas"
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
                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <DropdownApp
                            title={'TIPO DE HORAS'}
                            value={type}
                            setValue={setType}
                            options={typeHours}
                            placeholder={'Selecciona el tipo de horas'}
                        />
                    </Grid>
                </Grid>

                <Grid container spacing={0} justifyContent={'center'}>
                    <Grid item md={3} xs={6}>
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
