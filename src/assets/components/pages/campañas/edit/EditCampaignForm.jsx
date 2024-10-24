import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Box, Grid } from '@mui/material'
import axios from 'axios'
import FormControlLabel from '@mui/material/FormControlLabel'
import endpoint from '../../../services/endpoint'
import { EditCheckbox } from '../../../componentsApp/EditCheckbox'
import { uniqueId } from 'lodash'
import { useNavigate } from 'react-router-dom'

export function EditCampaignForm({ campaignId }) {
    const navigate = useNavigate()
    const [current_user, setCurrent_user] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date_start, setDate_start] = useState('')
    const [date_end, setDate_end] = useState('')
    const [users, setUsers] = useState([])
    const [participatingUsers, setParticipatingUsers] = useState([])

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

        setParticipatingUsers(data)
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
        let { data } = await axios.get(`${endpoint}fetchUsers`)

        if (data === 0) {
            return
        }

        setUsers(data)
    }

    const addCheckUser = (userId, campaignId) => {
        let object = {
            id: uniqueId('id_'),
            user_id: userId,
            campaign_id: Number(campaignId),
        }

        setParticipatingUsers((prevArray) => [...prevArray, object])
    }

    const deleteCheckUser = async (userId) => {
        let element = participatingUsers.filter((item) => {
            return item.user_id !== userId
        })
        setParticipatingUsers(element)

        let itemDeleted = participatingUsers.find((item) => {
            return item.user_id === userId
        })

        deleteUserToCampaign(itemDeleted.id)
    }

    const checkIfUserExistsInCampaign = async (userId, campaignId) => {
        let { data } = await axios.get(`${endpoint}checkIfUserCampaignExists`, {
            params: {
                campaign_id: campaignId,
                user_id: userId,
            },
        })

        if (data.length === 0) {
            await addUserToCampaign(userId, campaignId)
            return
        }
    }

    const addUserToCampaign = async (userId, campaignId) => {
        let { data } = await axios.get(`${endpoint}campaignUser`, {
            params: {
                user_id: userId,
                campaign_id: campaignId,
            },
        })

        if (!data) {
            return
        }
    }

    const deleteUserToCampaign = async (userCampaignId) => {
        if (typeof userCampaignId === 'string') return
        let { data } = await axios.delete(`${endpoint}campaignUser/${userCampaignId}`)

        if (!data) {
            return
        }
    }

    const editCampaign = async (e) => {
        e.preventDefault()

        let { data } = await axios.put(`${endpoint}campaign/${campaignId}`, {
            campaign_id: campaignId,
            user_id: current_user.id,
            name: name,
            description: description,
            date_start: date_start,
            date_end: date_end,
        })

        if (!data) {
            return
        }

        participatingUsers.map(async ({ user_id }) => {
            await checkIfUserExistsInCampaign(user_id, campaignId)
        })

        navigate('/campaigns')
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
                                    <EditCheckbox
                                        paramsToHandlerMethod={{
                                            first: user.id,
                                            second: campaignId,
                                        }}
                                        deleteMethod={deleteCheckUser}
                                        addMethod={addCheckUser}
                                        check={participatingUsers.some(
                                            (element) => element.user_id === user.id
                                        )}
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
                            disabled={false}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
