import React, { useState, useEffect } from 'react'
import { Grid, Button, TextField, IconButton, InputAdornment } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import endpoint from '../services/endpoint'
import { useNavigate } from 'react-router'
import { SnackbarApp } from '../componentsApp/SnackbarApp'
import { showSnackbar } from '../services/snackbarMethods'

export function LoginForm() {
    const navigate = useNavigate()
    const [dni, setDni] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [disabledButton, setDisabledButton] = useState(true)
    const [snackbar, setSnackbar] = useState({
        open: false,
        text: '',
        color: '',
    })

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'))

        if (user) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if (dni !== '' && password !== '') {
            setDisabledButton(false)
            return
        }
        showSnackbar(setSnackbar, 'Rellene todos los campos', 'warning')
        setDisabledButton(true)
    }, [dni, password])

    const handleLogin = async () => {
        try {
            let { data } = await axios.get(`${endpoint}checkuser`, {
                params: {
                    dni: dni,
                    password: password,
                },
            })

            if (data.length === 0) {
                showSnackbar(setSnackbar, 'Usuario no encontrado', 'error')
                return
            }

            if (data.estado === 'Baja') {
                showSnackbar(setSnackbar, 'Usuario dado de baja', 'error')
                return
            }

            sessionStorage.setItem('user', JSON.stringify(data))
            navigate('/')
        } catch (e) {
            showSnackbar(setSnackbar, 'Error al iniciar sesión', 'error')
        }
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <SnackbarApp
                properties={snackbar}
                handleClose={() => setSnackbar({ ...snackbar, open: false })}
            />
            <Grid container spacing={3} justifyContent={'center'}>
                <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <TextField
                        required
                        fullWidth
                        type="text"
                        label="DNI"
                        placeholder="12345678A"
                        variant="standard"
                        value={dni}
                        onChange={(e) => {
                            setDni(e.target.value)
                        }}
                    />
                </Grid>
                <Grid
                    item
                    md={12}
                    xs={12}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <TextField
                        required
                        fullWidth
                        type={showPassword ? 'text' : 'password'}
                        label="CONTRASEÑA"
                        placeholder="contraseñasegura1234"
                        variant="standard"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        InputProps={{
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
                <Grid
                    item
                    md={12}
                    xs={12}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingTop: 50,
                    }}
                >
                    <Button
                        fullWidth
                        style={{
                            textTransform: 'none',
                            backgroundColor: '#8BB925',
                            color: 'white',
                            fontSize: '18px',
                            borderRadius: 12,
                        }}
                        onClick={handleLogin}
                        disabled={disabledButton}
                    >
                        Iniciar sesión
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}
