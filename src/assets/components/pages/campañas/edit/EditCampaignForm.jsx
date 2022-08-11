import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Box, Grid } from '@mui/material'
import axios from 'axios'
import { CheckboxUsers } from './CheckboxUsers'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useNavigate } from 'react-router'

export function EditCampaignForm({ campaignId }) {
    let endpoint = 'http://localhost:8000/api/'
    const navigate = useNavigate()
    const [current_user, setCurrent_user] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date_start, setDate_start] = useState('')
    const [date_end, setDate_end] = useState('')
    const [users, setUsers] = useState([])

    const [checkUsers, setCheckUsers] = useState([])

    useEffect(() => {
        parsingDate(setDate_start, setDate_end)
        getUsers()
        infoCampaign()
        participatingUsersByCampaign()
    }, [])

    const infoCampaign = async () => {
        let { data } = await axios.get(`${endpoint}campaign/${campaignId}`)

        setName(data.name)
        setDescription(data.description)
        setDate_start(data.date_start)
        setDate_end(data.date_end)
    }

    const participatingUsersByCampaign = async () => {
        let { data } = await axios.get(`${endpoint}participatingUsers`, {
            params: {
                campaign_id: campaignId,
            },
        })

        if (data.length === 0) {
            return
        }
        console.log(data)
        setCheckUsers(data)
    }

    function parsingDate(event, event2) {
        let start_date = new Date()
        let day = start_date.getDate()
        let month = start_date.getMonth() + 1

        if (day < 10) {
            day = `0${day}`
        }

        if (month < 10) {
            month = `0${month}`
        }

        event(start_date.getFullYear() + '-' + month + '-' + day)
        event2(start_date.getFullYear() + '-' + month + '-' + day)
    }

    const getUsers = async () => {
        let { data } = await axios.get(`${endpoint}users`)

        if (data === 0) {
            return
        }

        setUsers(data)
    }

    const addCheckUser = (userId, label) => {
        let object = {
            user_id: userId,
            name: label,
        }

        setCheckUsers((prevArray) => [...prevArray, object])
    }

    const deleteCheckUser = (userId, label) => {
        let element = checkUsers.filter((item) => {
            return item.userId !== userId
        })

        setCheckUsers(element)
    }

    const editCampaign = async (e) => {
        e.preventDefault()

        //añadir campaña
        let { data } = await axios.put(`${endpoint}campaign/${campaignId}`, {
            campaign_id: campaignId,
            user_id: current_user.id,
            name: name,
            description: description,
            date_start: date_start,
            date_end: date_end,
        })

        //data es id de la campaña recientemente creada

        if (!data) {
            return
        }
        let campaign_id = data

        checkUsers.forEach((user) => {
            checkIfUserCampaignExists(campaign_id, user.user_id)
        })
    }
    const checkIfUserCampaignExists = async (campaign_id, user_id) => {
        let { data } = await axios.get(`${endpoint}checkIfUserCampaignExists`, {
            params: {
                user_id: user_id,
                campaign_id: campaign_id,
            },
        })

        console.log(data)

        if (data.length !== 0) {
            return
        }

        editCampaignUsers(campaign_id, user_id)
    }

    const editCampaignUsers = async (campaign_id, user_id) => {
        let { data } = await axios.get(`${endpoint}campaignUser`, {
            params: {
                campaign_id: campaign_id,
                user_id: user_id,
            },
        })

        if (data) {
            navigate('/campaigns')
        }
    }

    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={editCampaign}>
                <Grid container spacing={0} flexDirection="column">
                    <Grid item md={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">NOMBRE</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="Campaña x"
                            variant="standard"
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            error={name.length === 0 ? true : false}
                            helperText={
                                name.length === 0 ? 'Por favor escribe el nombre de la campaña' : ''
                            }
                            FormHelperTextProps={{
                                style: {
                                    fontSize: '14px',
                                    paddingTop: '7px',
                                },
                            }}
                        />
                    </Grid>

                    <Grid item md={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">DESCRIPCION</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="Descripción corta..."
                            variant="standard"
                            required
                            value={description}
                            onChange={(e) => {
                                setDescription(e.target.value)
                            }}
                            error={description.length === 0 ? true : false}
                            helperText={
                                description.length === 0
                                    ? 'Por favor escribe la descripción de la campaña'
                                    : ''
                            }
                            FormHelperTextProps={{
                                style: {
                                    fontSize: '14px',
                                    paddingTop: '7px',
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={5}>
                    <Grid item md={6} paddingBottom="15px">
                        <Typography paddingBottom="15px">FECHA DE INICIO</Typography>
                        <TextField
                            type="date"
                            fullWidth
                            variant="standard"
                            required
                            value={date_start}
                            onChange={(e) => {
                                setDate_start(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item md={6} paddingBottom="15px">
                        <Typography paddingBottom="15px">FECHA DE FINALIZACION</Typography>
                        <TextField
                            type="date"
                            fullWidth
                            variant="standard"
                            required
                            value={date_end}
                            onChange={(e) => {
                                setDate_end(e.target.value)
                            }}
                        />
                    </Grid>
                </Grid>

                <Typography paddingTop="10px" paddingBottom="10px">
                    USUARIOS
                </Typography>
                <Grid container spacing={0}>
                    {users.map((user) => (
                        <Grid item md={3}>
                            <FormControlLabel
                                control={
                                    <CheckboxUsers
                                        userId={user.id}
                                        label={user.name}
                                        deleteCheckUser={deleteCheckUser}
                                        addCheckUser={addCheckUser}
                                        checkUsers={checkUsers}
                                    />
                                }
                                label={user.name}
                            />
                        </Grid>
                    ))}
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
                            disabled={checkUsers.length === 0 ? true : false}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
