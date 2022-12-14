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
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { useNavigate } from 'react-router'
import endpoint from '../../../services/endpoint'

export function EditUserForm({ userId }) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [contractHours, setContractHours] = useState(null)
    const [rol, setRol] = useState('')
    const [roles, setRoles] = useState([])
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        parsingDate(setDateStart)
        getRoles()
        InfoUserById()
    }, [])

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
    }

    const getRoles = async () => {
        let { data } = await axios.get(`${endpoint}rolesUser`)

        if (data.length === 0) {
            return
        }

        setRoles(data)
    }

    const editUser = async (e) => {
        e.preventDefault()

        let { data } = await axios.put(`${endpoint}user/${userId}`, {
            id: parseInt(userId),
            name: name,
            email: email,
            password: password,
            hours_contract: contractHours,
            rol: rol,
            date_start: dateStart,
        })

        if (data.length === 0) {
            Alert('Los datos introducidos no són correctos')
            return
        }

        navigate('/usuarios')
    }

    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={editUser}>
                <Grid container spacing={4} flexDirection="row">
                    <Grid item md={4} paddingBottom="15px">
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
                    <Grid item md={4} paddingBottom="15px">
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
                    <Grid item md={4} paddingBottom="15px">
                        <Typography paddingBottom="15px">Contraseña</Typography>
                        <Input
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={4} paddingBottom="15px">
                    <Grid item md={4}>
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
                    <Grid item md={4}>
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
                    <Grid item md={4} paddingBottom="15px">
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
                                <option value={item.rol}>{item.rol}</option>
                            ))}
                        </NativeSelect>
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
