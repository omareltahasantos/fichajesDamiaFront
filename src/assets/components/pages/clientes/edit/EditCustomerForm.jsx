import React, { useEffect, useState } from 'react'
import { TextField, Button, Typography, Box, Grid, Alert } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router'
import endpoint from '../../../services/endpoint'

export function EditCustomerForm({ customerId }) {
    const navigate = useNavigate()
    const [name, setName] = useState('')

    useEffect(() => {
        getCustomer()
    }, [])

    const getCustomer = async () => {
        let { data } = await axios.get(`${endpoint}customer/${customerId}`)

        setName(data.name)
    }

    const editCustomer = async (e) => {
        e.preventDefault()

        let { data } = await axios.put(`${endpoint}customer/${customerId}`, {
            name: name,
        })

        if (data.length === 0) {
            Alert('Los datos introducidos no són correctos')
            return
        }

        navigate('/clientes')
    }

    return (
        <>
            <Box component="form" autoComplete="off" onSubmit={editCustomer}>
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
