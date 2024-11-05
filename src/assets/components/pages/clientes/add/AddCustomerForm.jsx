import React, { useState } from 'react'
import { TextField, Button, Typography, Box, Grid, Snackbar } from '@mui/material'
import axios from 'axios'
import endpoint from '../../../services/endpoint'
import { SnackbarApp } from '../../../componentsApp/SnackbarApp'

export function AddCustomerForm() {
    const [name, setName] = useState('')
    const [code, setCode] = useState('')
    const [snackbar, setSnackbar] = useState({
        open: false,
        text: '',
        color: '',
    })

    const addUser = async (e) => {
        e.preventDefault()

        let { status } = await axios.get(`${endpoint}customer`, {
            params: {
                name: name,
                code: code,
            },
        })

        if (status === 201) {
            setName('')
            setCode('')
        }

        setSnackbar({
            open: true,
            text: status === 201 ? 'Proyecto creado correctamente' : 'Error al crear el proyecto',
            color: status === 201 ? 'success' : 'error',
        })
    }

    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={addUser}>
                <SnackbarApp
                    properties={snackbar}
                    handleClose={() => setSnackbar({ ...snackbar, open: false })}
                />
                <Grid container spacing={4} flexDirection="row">
                    <Grid item md={4} xs={12} paddingBottom="15px">
                        <Typography paddingBottom="15px">NOMBRE</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="Proyecto"
                            variant="standard"
                            required
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                            error={name.length === 0 ? true : false}
                            helperText={
                                name.length === 0 && 'Por favor escribe el nombre del proyecto'
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
                        <Typography paddingBottom="15px">CÓDIGO</Typography>
                        <TextField
                            type="text"
                            fullWidth
                            placeholder="Código"
                            variant="standard"
                            required
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value)
                            }}
                            error={code.length === 0 ? true : false}
                            helperText={
                                code.length === 0 && 'Por favor escribe el código del proyecto'
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
