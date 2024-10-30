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
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import axios from 'axios'
import { useNavigate } from 'react-router'
import endpoint from '../../../services/endpoint'

export function AddCustomerForm() {
    const navigate = useNavigate()
    const [name, setName] = useState('')

    const addUser = async (e) => {
        e.preventDefault()

        let json = {
            name: name,
        }

        let { data } = await axios.get(`${endpoint}customer`, {
            params: json,
        })

        if (data.length === 0) {
            Alert('Los datos introducidos no són correctos')
            return
        }

        navigate('/clientes')
    }

    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={addUser}>
                <Grid container spacing={4} flexDirection="row">
                    <Grid item md={6} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">NOMBRE</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="Cliente/a"
                            variant="standard"
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            error={name.length === 0 ? true : false}
                            helperText={
                                name.length === 0 && 'Por favor escribe el nombre del cliente'
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
                        >
                            Guardar
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </>
    )
}
