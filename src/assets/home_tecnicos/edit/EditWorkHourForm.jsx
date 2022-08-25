import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Box, Grid, Typography, Button, TextField } from '@mui/material'
import { useNavigate } from 'react-router'

export function EditWorkHourForm({
    campaignName,
    currentUser,
    campaignId,
    latitude,
    longitude,
    hourId,
}) {
    const endpoint = 'https://smfichajes.herokuapp.com/api/'
    const navigate = useNavigate()
    const [name, setName] = useState(currentUser.name)
    const [campaign, setCampaign] = useState(campaignName)
    const [date, setDate] = useState(new Date())
    const [hours, setHours] = useState(0)

    useEffect(() => {
        parsingDate(setDate)
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

    const editHours = async (e) => {
        e.preventDefault()
        let hours_obj = {
            hour_id: hourId,
            register_end: date,
            ubication_end: `${latitude}, ${longitude}`,
            hours: hours,
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
                    <Grid item md={12} paddingBottom="15px">
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
                    <Grid item md={12} paddingBottom="15px">
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

                    <Grid item md={12} paddingBottom="15px">
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
                    <Grid item md={12} paddingBottom="15px">
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
                    <Grid item md={12}>
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
