import React, { useState, useEffect } from 'react'
import axios from 'axios'
import endpoint from '../../components/services/endpoint'
import { Box, Grid, Typography, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router'

export function AddHoursForm({ campaignName, currentUser, campaignId, latitude, longitude }) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [campaign, setCampaign] = useState('')
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        parsingDate(setDate)
        setCampaign(campaignName)
        setName(currentUser.name)
    }, [])

    function parsingDate(event) {
        let start_date = new Date()
        let day = start_date.getDate()
        let month = start_date.getMonth() + 1

        if (day < 10) {
            day = `0${day}`
        }

        if (month < 10) {
            month = `0${month}`
        }

        event(
            start_date.getFullYear() +
                '-' +
                month +
                '-' +
                day +
                ' ' +
                start_date.getHours() +
                ':' +
                start_date.getMinutes() +
                ':' +
                start_date.getSeconds()
        )
    }

    const addHours = async () => {
        let hours = {
            user_id: currentUser.id,
            campaign_id: campaignId,
            register_start: date,
            register_end: null,
            ubication_start: `${latitude}, ${longitude}`,
            ubication_end: '',
            hours: 0,
            type: 'normales',
            validate: '',
        }

        let { data } = axios.get(`${endpoint}hour`, {
            params: hours,
        })

        if (data === 'record failed!') {
            return
        }

        navigate(`/horas/${campaignId}`)
    }
    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={addHours}>
                <Grid container spacing={4} flexDirection="column">
                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">NOMBRE</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="Técnico/a"
                            variant="standard"
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
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
                            onChange={(e) => {
                                setCampaign(e.target.value)
                            }}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">FECHA</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            variant="standard"
                            required
                            value={date}
                            onChange={(e) => {
                                setDate(e.target.value)
                            }}
                            InputProps={{
                                readOnly: true,
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
