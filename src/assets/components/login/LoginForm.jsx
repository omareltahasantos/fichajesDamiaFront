import React, { useState, useEffect } from 'react'
import {
    Grid,
    Button,
    TextField,
    Typography,
    Box,
    IconButton,
    InputLabel,
    InputAdornment,
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { useNavigate } from 'react-router'

export function LoginForm() {
    const endpoint = 'http://localhost:8000/api'
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [disabledButton, setDisabledButton] = useState(true)

    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'))

        if (user) {
            navigate('/')
        }
    }, [])

    useEffect(() => {
        if (email !== '' && password !== '') {
            setDisabledButton(false)
        }
    }, [email, password])

    const handleLogin = async () => {
        let { data } = await axios.get(`${endpoint}/checkuser`, {
            params: {
                email: email,
                password: password,
            },
        })
        if (data.length !== 0) {
            sessionStorage.setItem('user', JSON.stringify(data[0]))
            navigate('/')
        }

        return
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid
                    item
                    md={12}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                    <TextField
                        helperText={
                            email !== ''
                                ? email.includes('@') === true
                                    ? ''
                                    : 'El email debe llevar @'
                                : ''
                        }
                        error={
                            email !== ''
                                ? email.includes('@') === true
                                    ? ''
                                    : 'El email debe llevar @'
                                : ''
                        }
                        required
                        fullWidth
                        type="email"
                        label="EMAIL"
                        placeholder="someone@example.com"
                        variant="standard"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                    />
                </Grid>
                <Grid
                    item
                    md={12}
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
