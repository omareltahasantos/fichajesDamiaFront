import React, { useEffect, useState } from 'react'
import {
    TextField,
    Button,
    Typography,
    Box,
    Grid,
    NativeSelect,
    InputAdornment,
    IconButton,
    Alert,
    FormControlLabel,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { useNavigate } from 'react-router'
import endpoint from '../../../services/endpoint'
import { AddCheckbox } from '../../../componentsApp/AddCheckbox'
import getCustomers, { orderCustomers } from '../../../services/methods'
import { AlertApp } from '../../../componentsApp/AlertApp'

export function AddUserForm({ customerId }) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dni, setDni] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [contractHours, setContractHours] = useState(0)
    const [rol, setRol] = useState('')
    const [password, setPassword] = useState('')
    const [roles, setRoles] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [customers, setCustomers] = useState([])
    const [checkCustomers, setCheckCustomers] = useState([])

    useEffect(() => {
        parsingDate(setDateStart)
        getRoles()
        getCustomers().then((customers) => {
            setCustomers(orderCustomers(customers))
        })
    }, [])

    useEffect(() => {
        setPassword(dni.length > 0 ? `sm_${dni.substring(0, 4)}` : '')
    }, [dni])

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

        event(start_date.getFullYear() + '-' + month + '-' + day)
    }

    const getRoles = async () => {
        let { data } = await axios.get(`${endpoint}rolesUser`)

        if (data.length === 0) {
            setRoles([])
            return []
        }

        setRoles(
            data.map((item) => {
                if (item.rol === 'COORDINADOR')
                    return {
                        value: item.rol,
                        label: item.rol,
                    }

                return {
                    value: item.rol,
                    label: item.rol === 'ADMIN' ? 'JP' : 'USUARIO',
                }
            })
        )
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    const addCheckCustomers = (customerId, label) => {
        let object = {
            customerId: customerId,
            name: label,
        }

        setCheckCustomers((prevArray) => [...prevArray, object])
    }

    const deleteCheckCustomer = (customerId, label) => {
        let element = checkCustomers.filter((item) => {
            return item.value !== customerId
        })

        setCheckCustomers(element)
    }

    const addUser = async (e) => {
        e.preventDefault()

        let json = {
            name: name,
            dni: dni,
            email: email,
            password: password,
            hours_contract: contractHours,
            rol: rol,
            date_start: dateStart,
        }

        let { data, status } = await axios.get(`${endpoint}user`, {
            params: json,
        })

        if (data.length === 0) {
            Alert('Los datos introducidos no són correctos')
            return
        }

        let userId = data

        checkCustomers.forEach(async (customer) => {
            let json = {
                userId: userId,
                customerId: customer.customerId,
            }

            await axios.get(`${endpoint}linkUserCustomer`, {
                params: json,
            })
        })

        navigate('/usuarios', { state: { customerId: customerId } })
    }

    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={addUser}>
                <Grid container spacing={4} flexDirection="row">
                    <Grid item md={4} xs={12} paddingBottom="15px">
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
                            error={name.length === 0 ? true : false}
                            helperText={
                                name.length === 0 ? 'Por favor escribe el nombre del técnico/a' : ''
                            }
                            FormHelperTextProps={{
                                style: {
                                    fontSize: '14px',
                                    paddingTop: '7px',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item md={4} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">DNI</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="12345678A"
                            variant="standard"
                            required
                            value={dni}
                            onChange={(e) => {
                                setDni(e.target.value)
                            }}
                            error={dni.length === 0 || /^\w{9}$/.test(dni) === false ? true : false}
                            helperText={
                                dni.length === 0
                                    ? 'Por favor escribe el dni del técnico/a'
                                    : /^\w{9}$/.test(dni) === false
                                    ? 'Por favor escribe un dni válido'
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
                    <Grid item md={4} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">EMAIL</Typography>
                        <TextField
                            type="email"
                            fullWidth
                            placeholder="someone@example.com"
                            variant="standard"
                            required
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            error={email.length === 0 ? true : false}
                            helperText={email.length === 0 ? 'Por favor escribe un email' : ''}
                            FormHelperTextProps={{
                                style: {
                                    fontSize: '14px',
                                    paddingTop: '7px',
                                },
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} paddingBottom="15px">
                    <Grid item md={4} xs={12}>
                        <Typography paddingBottom="15px">HORAS CONTRATADAS</Typography>
                        <TextField
                            type="number"
                            fullWidth
                            placeholder="123..."
                            variant="standard"
                            required
                            value={contractHours}
                            onChange={(e) => {
                                setContractHours(e.target.value)
                            }}
                            error={contractHours < 0 ? true : false}
                            helperText={
                                contractHours < 0 ? 'Por favor no pongas numeros negativos.' : ''
                            }
                            FormHelperTextProps={{
                                style: {
                                    fontSize: '14px',
                                    paddingTop: '7px',
                                },
                            }}
                        />
                    </Grid>
                    <Grid item md={4} xs={12}>
                        <Typography paddingBottom="15px">FECHA DE INICIO</Typography>
                        <TextField
                            type="date"
                            fullWidth
                            variant="standard"
                            required
                            value={dateStart}
                            onChange={(e) => {
                                setDateStart(e.target.value)
                            }}
                        />
                    </Grid>
                    <Grid item md={4} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">ROL</Typography>
                        <NativeSelect
                            required
                            fullWidth
                            inputProps={{
                                name: 'age',
                                id: 'uncontrolled-native',
                            }}
                            value={rol}
                            onChange={(e) => {
                                setRol(e.target.value)
                            }}
                        >
                            <option>Selecciona un rol</option>
                            {roles !== null &&
                                roles.map((item) => (
                                    <option value={item.value}>{item.label}</option>
                                ))}
                        </NativeSelect>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12}>
                        <Typography paddingBottom="15px">CONTRASEÑA</Typography>
                        <TextField
                            required
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            placeholder="contraseñasegura1234"
                            variant="standard"
                            value={password}
                            error={password.length === 0 ? true : false}
                            helperText={
                                password.length === 0 ? 'Por favor escribe una contraseña' : ''
                            }
                            InputProps={{
                                readOnly: true,
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <IconButton onClick={handleShowPassword}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Grid>
                </Grid>
                <Typography paddingTop="10px" paddingBottom="10px" fontWeight={'bold'}>
                    PROYECTOS
                </Typography>
                <Grid container spacing={0}>
                    <Grid item md={12} xs={12} paddingBottom={2} paddingTop={1}>
                        <Alert severity="info">
                            <Typography variant="body1">
                                El proyecto SM no es acumulativo con otros proyectos
                            </Typography>
                        </Alert>
                    </Grid>
                    {customers.length === 0 ? (
                        <Grid item md={12} xs={12}>
                            <AlertApp
                                severity={'warning'}
                                title={'Atención:'}
                                message={
                                    'No hay proyectos creados, debes contactar con informática para añadir proyectos.'
                                }
                            />
                        </Grid>
                    ) : (
                        customers.map((customer) => (
                            <Grid item md={3} xs={6}>
                                <FormControlLabel
                                    control={
                                        <AddCheckbox
                                            addMethod={() =>
                                                addCheckCustomers(customer.value, customer.label)
                                            }
                                            deleteMethod={() =>
                                                deleteCheckCustomer(customer.value, customer.label)
                                            }
                                        />
                                    }
                                    label={customer.label}
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
                            disabled={rol === '' || rol === 'Selecciona un rol' ? true : false}
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
