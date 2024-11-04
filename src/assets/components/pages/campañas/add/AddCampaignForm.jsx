import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Box, Grid } from '@mui/material'
import axios from 'axios'
import { AddCheckbox } from '../../../componentsApp/AddCheckbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import { useNavigate } from 'react-router'
import endpoint from '../../../services/endpoint'
import { AlertApp } from '../../../componentsApp/AlertApp'
import { DropdownApp } from '../../../componentsApp/DropdownApp'
import { TextFieldSearch } from '../../../componentsApp/TextFieldSearch'

export function AddCampaignForm({ customerId }) {
    const navigate = useNavigate()
    const [current_user, setCurrent_user] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date_start, setDate_start] = useState('')
    const [date_end, setDate_end] = useState('')
    const [users, setUsers] = useState([])
    const [usersShown, setUsersShown] = useState([])
    const [keyword, setKeyword] = useState('')

    const [checkUsers, setCheckUsers] = useState([])

    useEffect(() => {
        parsingDate(setDate_start, setDate_end)
        getUsers(customerId)
    }, [customerId])

    useEffect(() => {
        if (keyword.value === 'all' || keyword === '') {
            getUsers(customerId)
            return
        }

        let userSelected = users.filter((user) => {
            return user.id === keyword.value
        })
        setUsersShown(userSelected)
    }, [keyword])

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

    const getUsers = async (customerId) => {
        let { data } = await axios.get(`${endpoint}fetchUsers`, {
            params: { customerId: customerId },
        })

        if (data === 0) {
            return
        }

        setUsers(data)
        setUsersShown(data)
    }

    const addCheckUser = (userId, label) => {
        let object = {
            userId: userId,
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

    const addCampaign = async (e) => {
        e.preventDefault()

        //añadir campaña
        let { data } = await axios.get(`${endpoint}campaign`, {
            params: {
                user_id: current_user.id,
                name: name,
                description: description,
                date_start: date_start,
                date_end: date_end,
                customerId: customerId,
            },
        })

        //data es id de la campaña recientemente creada
        if (!data) {
            return
        }
        let campaign_id = data
        checkUsers.forEach((user) => {
            addCampaignUsers(campaign_id, user.userId)
        })
    }

    const addCampaignUsers = async (campaign_id, user_id) => {
        let { data } = await axios.get(`${endpoint}campaignUser`, {
            params: {
                campaign_id: campaign_id,
                user_id: user_id,
            },
        })

        if (data) {
            setName('')
            setDescription('')
            setCheckUsers([])
            navigate('/campaigns', { state: { customerId: customerId } })
        }
    }

    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={addCampaign}>
                <Grid container spacing={0} flexDirection="column">
                    <Grid item md={12} xs={12} paddingBottom="15px">
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

                    <Grid item md={12} xs={12} paddingBottom="15px">
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
                    <Grid item md={6} xs={12} paddingBottom="0px">
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
                    <Grid item md={6} xs={12} paddingBottom="15px">
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

                <Typography paddingTop="10px" paddingBottom="20px">
                    USUARIOS
                </Typography>
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12} paddingBottom={0}>
                        <TextFieldSearch
                            title={'Buscar usuario'}
                            value={keyword}
                            setValue={setKeyword}
                            options={users.map((user) => {
                                return { value: user.id, label: user.name }
                            })}
                            optionDefault={'Selecciona un usuario'}
                        />
                    </Grid>
                    {usersShown.length === 0 ? (
                        <Grid item md={12} xs={12}>
                            <AlertApp
                                severity={'warning'}
                                title={'Atención:'}
                                message={
                                    'No hay usuarios asoaciados al cliente, debes añadirlos desde la sección de usuarios.'
                                }
                            />
                        </Grid>
                    ) : (
                        usersShown.map((user) => (
                            <Grid item md={3} xs={6}>
                                <FormControlLabel
                                    control={
                                        <AddCheckbox
                                            deleteMethod={() => deleteCheckUser(user.id, user.name)}
                                            addMethod={() => addCheckUser(user.id, user.name)}
                                            itemChecked={checkUsers.some(
                                                (item) => item.userId === user.id
                                            )}
                                        />
                                    }
                                    label={user.name}
                                />
                            </Grid>
                        ))
                    )}
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
