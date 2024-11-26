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
    Input,
    FormControlLabel,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { useNavigate } from 'react-router'
import endpoint from '../../../services/endpoint'
import getCustomers, { orderCustomers } from '../../../services/methods'
import { uniqueId } from 'lodash'
import { EditCheckbox } from '../../../componentsApp/EditCheckbox'
import { AlertApp } from '../../../componentsApp/AlertApp'

export function EditUserForm({ userId, customerId }) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dni, setDni] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [contractHours, setContractHours] = useState(null)
    const [rol, setRol] = useState('')
    const [roles, setRoles] = useState([])
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [customers, setCustomers] = useState([])
    const [checkCustomers, setCheckCustomers] = useState([])

    useEffect(() => {
        parsingDate(setDateStart)
        getRoles()
        InfoUserById()
        getCustomers().then((customers) => {
            setCustomers(orderCustomers(customers))
        })
        userLinkedToCustomer()
    }, [])

    useEffect(() => {
        setPassword(dni.length > 0 ? `sm_${dni.substring(0, 4)}` : '')
    }, [dni])

    useEffect(() => {
        const SM_CUSTOMER_ID = 2

        let isIncluded = checkCustomers.some((item) => item.customerId === SM_CUSTOMER_ID)

        if (isIncluded) {
            checkCustomers.forEach((item) => {
                if (item.customerId === SM_CUSTOMER_ID) {
                    return
                }
                deleteCheckCustomer(item.userId, item.customerId)
            })
            setCheckCustomers(checkCustomers.filter((item) => item.customerId === SM_CUSTOMER_ID))

            return
        }
    }, [checkCustomers])

    function parsingDate(event, date) {
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

    const InfoUserById = async () => {
        let { data } = await axios.get(`${endpoint}user/${userId}`)

        setName(data.name)
        setEmail(data.email)
        setContractHours(data.hours_contract)
        setDateStart(data.date_start)
        setRol(data.rol)
        setPassword(data.password)
        setDni(data.dni)
    }

    const getRoles = async () => {
        let { data } = await axios.get(`${endpoint}rolesUser`)

        if (data.length === 0) {
            return
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

    const userLinkedToCustomer = async () => {
        let { data } = await axios.get(`${endpoint}linkedUserCustomer`, {
            params: {
                userId: userId,
            },
        })

        if (data.length === 0) {
            return
        }

        setCheckCustomers(data)
    }

    const addCheckCustomer = (userId, customerId) => {
        let object = {
            id: uniqueId('id_'),
            userId: userId,
            customerId: Number(customerId),
        }

        setCheckCustomers((prevArray) => [...prevArray, object])
    }

    const deleteCheckCustomer = async (userId, customerId) => {
        let element = checkCustomers.filter((item) => {
            return item.customerId !== customerId
        })
        setCheckCustomers(element)

        let itemDeleted = checkCustomers.find((item) => {
            return item.customerId === customerId
        })

        deleteCustomerToUser(itemDeleted.id)
    }

    const checkIfExistsLinkUserToCustomer = async (userId, customerId) => {
        let { data } = await axios.get(`${endpoint}checkIfUserLinkedToCustomer`, {
            params: {
                userId: userId,
                customerId: customerId,
            },
        })

        if (data.length === 0) {
            await addCustomerToUser(userId, customerId)
            return
        }
    }

    const addCustomerToUser = async (userId, customerId) => {
        let { data } = await axios.get(`${endpoint}linkUserCustomer`, {
            params: {
                userId: userId,
                customerId: customerId,
            },
        })

        if (!data) {
            return
        }
    }

    const deleteCustomerToUser = async (rulesId) => {
        if (typeof rulesId === 'string') return
        let { data } = await axios.delete(`${endpoint}destroyLinkUserCustomer/${rulesId}`)

        if (!data) {
            return
        }
    }

    const editUser = async (e) => {
        e.preventDefault()

        let { data } = await axios.put(`${endpoint}user/${userId}`, {
            id: parseInt(userId),
            name: name,
            email: email,
            dni: dni,
            password: password,
            hours_contract: contractHours,
            rol: rol,
            date_start: dateStart,
        })

        if (data.length === 0) {
            Alert('Los datos introducidos no són correctos')
            return
        }

        checkCustomers.map(async (item) => {
            await checkIfExistsLinkUserToCustomer(item.userId, item.customerId)
        })
        navigate('/usuarios', { state: { customerId: customerId } })
    }

    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={editUser}>
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
                            {roles.map((item) => (
                                <option value={item.value}>{item.label}</option>
                            ))}
                        </NativeSelect>
                    </Grid>
                    <Grid item md={12} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">Contraseña</Typography>
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
                                        <IconButton onClick={() => setShowPassword(!showPassword)}>
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
                                        <EditCheckbox
                                            paramsToHandlerMethod={{
                                                first: userId,
                                                second: customer.value,
                                            }}
                                            important={true}
                                            deleteMethod={deleteCheckCustomer}
                                            addMethod={addCheckCustomer}
                                            check={checkCustomers.some(
                                                (element) => element.customerId === customer.value
                                            )}
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
                                marginTop: '20px',
                                borderRadius: '10px',
                                backgroundColor: '#8bb925',
                            }}
                            fullWidth
                            disabled={
                                rol === '' ||
                                rol === 'Selecciona un rol' ||
                                checkCustomers.length === 0
                                    ? true
                                    : false
                            }
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
