import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Grid, Typography, Breadcrumbs, Button, Container, Link, Divider } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { CardCampaign } from '../../campaign/CardCampaign'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { UserTable } from '../../users/UserTable'
import { Footer } from '../../Footer'
import endpoint from '../../services/endpoint'
import { DropdownApp } from '../../componentsApp/DropdownApp'
import getCustomers from '../../services/methods'
import { CustomerSearch } from '../../customers/CustomerSearch'

export function Users() {
    const navigate = useNavigate()
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
    const [customersSelected, setCustomerSelected] = useState('')

    useEffect(() => {
        getCountUsers()
        getCountContractedHours()
        getCustomers().then((customers) => {
            setCustomers(customers)
        })
    }, [])

    /**
     *
     * CUANDO EL USUARIO SELECCIONE NUEVO CLIENTE TODAS LAS FUNCIONES DEBEN SACARSE EN BASE AL CLIENTE SELECCIONADO....
     */

    const getCountUsers = async () => {
        let { data } = await axios.get(`${endpoint}countUsers`)

        setCountUsers(data)
    }

    const getCountContractedHours = async () => {
        let { data } = await axios.get(`${endpoint}contractedHours`)

        if (data.length === 0) {
            setCountContractedHours(0)
            return
        }
        setCountContractedHours(data[0].contracted_hours)
    }

    return (
        <>
            <AppBarComponent />
            <Container style={{ paddingTop: '40px' }}>
                <Grid
                    container
                    spacing={3}
                    flexDirection="column"
                    style={{ paddingBottom: '40px' }}
                >
                    <Grid item md={3}>
                        <Typography
                            variant="h4"
                            style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                        >
                            Usuarios
                        </Typography>
                    </Grid>
                    <Grid item md={3}>
                        <Breadcrumbs separator="›" aria-label="breadcrumb">
                            {breadcrumb.map((bread) => bread)}
                        </Breadcrumbs>
                    </Grid>
                    <Grid item md={3}>
                        <Button
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                fontSize: '16px',
                                backgroundColor: '#8BB925',
                            }}
                            onClick={() => {
                                navigate('/usuarios/add')
                            }}
                        >
                            <AddIcon /> Añadir usuario
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item md={6}>
                        <CardCampaign title="Total usuarios" description={countUsers} />
                    </Grid>
                    <Grid item md={6}>
                        <CardCampaign
                            title="Total horas contratadas"
                            description={`${countContractedHours}`}
                        />
                    </Grid>
                </Grid>
                <Divider style={{ marginTop: 50, marginBottom: 30, border: '2px solid #b9d47b' }} />
                <Grid container spacing={0} style={{ paddingBottom: '20px' }}>
                    <Grid item md={12}>
                        <DropdownApp
                            title={'Seleccionar cliente:'}
                            value={customersSelected}
                            setValue={setCustomerSelected}
                            optionDefault={'Buscar cliente'}
                            options={customers}
                        />
                    </Grid>
                </Grid>

                {customersSelected !== '' && (
                    <UserTable
                        getCountUsers={getCountUsers}
                        countUsers={countUsers}
                        getCountContractedHours={getCountContractedHours}
                    />
                )}
            </Container>
            <Footer />
        </>
    )
}
