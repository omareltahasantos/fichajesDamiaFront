import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import { Grid, Typography, Breadcrumbs, Button, Container, Link, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { CardCampaign } from '../../campaign/CardCampaign'
import { UserTable } from '../../users/UserTable'
import endpoint from '../../services/endpoint'
import { DropdownApp } from '../../componentsApp/DropdownApp'
import getCustomers from '../../services/methods'

export function Users() {
    const navigate = useNavigate()
    const location = useLocation()
    const user = JSON.parse(sessionStorage.getItem('user'))
    const breadcrumb = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            onClick={() => {
                navigate('/')
            }}
        >
            Home
        </Link>,
        <Typography style={{ fontWeight: 'bold' }}>Usuarios</Typography>,
    ]

    const [countUsers, setCountUsers] = useState(null)
    const [countContractedHours, setCountContractedHours] = useState(null)
    const [customers, setCustomers] = useState([])
    const [customerSelected, setCustomerSelected] = useState(null)

    useEffect(() => {
        getCustomers().then((customers) => {
            if (
                location.pathname === '/usuarios' &&
                (user.rol === 'CONTROL' || user.rol === 'ADMIN')
            ) {
                setCustomers([{ label: 'MOSTRAR TODOS', value: 0 }, ...customers])
                return
            }

            setCustomers(customers)
        })
    }, [])

    useEffect(() => {
        if (location.state) {
            setCustomerSelected(location.state.customerId)
        }
    }, [location.state])

    useEffect(() => {
        if (customerSelected === null) return
        getCountUsers(customerSelected.value)
        getCountContractedHours(customerSelected.value)
    }, [customerSelected])

    const getCountUsers = async (customerId) => {
        let { data } = await axios.get(`${endpoint}countUsers`, {
            params: { customerId },
        })

        setCountUsers(data)
    }

    const getCountContractedHours = async (customerId) => {
        let { data } = await axios.get(`${endpoint}contractedHours`, {
            params: { customerId },
        })

        setCountContractedHours(data)
    }

    return (
        <>
            <Container maxWidth="xl" style={{ paddingTop: '40px' }}>
                <Grid
                    container
                    spacing={3}
                    flexDirection="column"
                    style={{ paddingBottom: '20px' }}
                >
                    <Grid item md={3} xs={12}>
                        <Typography
                            variant="h4"
                            style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                        >
                            Usuarios
                        </Typography>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>

                    <Grid item md={3} xs={12}>
                        <Button
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                fontSize: '16px',
                                backgroundColor: '#8BB925',
                            }}
                            onClick={() => {
                                navigate('/usuarios/add', {
                                    state: { customerId: customerSelected.value },
                                })
                            }}
                        >
                            <AddIcon /> Añadir usuario
                        </Button>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <DropdownApp
                            title={'Seleccionar proyecto:'}
                            value={customerSelected}
                            setValue={setCustomerSelected}
                            optionDefault={'Buscar proyecto'}
                            options={customers}
                            placeholder={'Buscar proyecto'}
                        />
                    </Grid>
                </Grid>
                {customerSelected !== null && (
                    <>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={6}>
                                <CardCampaign title="Total usuarios" description={countUsers} />
                            </Grid>
                            <Grid item md={6} xs={6}>
                                <CardCampaign
                                    title="Total horas contratadas"
                                    description={`${countContractedHours}`}
                                />
                            </Grid>
                        </Grid>
                        <Divider
                            style={{ marginTop: 20, marginBottom: 20, border: '2px solid #b9d47b' }}
                        />

                        <UserTable
                            getCountUsers={() => getCountUsers(customerSelected.value)}
                            countUsers={countUsers}
                            getCountContractedHours={() =>
                                getCountContractedHours(customerSelected.value)
                            }
                            customerId={customerSelected.value}
                        />
                    </>
                )}
            </Container>
        </>
    )
}
