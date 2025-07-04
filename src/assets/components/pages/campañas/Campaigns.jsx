import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import { Grid, Typography, Container, Link, Divider } from '@mui/material'
import { CardCampaign } from '../../campaign/CardCampaign'
import { CampaignsTable } from '../../campaign/CampaignsTable'
import { HeaderPages } from '../../HeaderPages'
import endpoint from '../../services/endpoint'
import getCustomers from '../../services/methods'
import { format } from 'date-fns'

export function Campaigns() {
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
        <Typography style={{ fontWeight: 'bold' }}>Proyectos - Campañas</Typography>,
    ]

    const [countCampaigns, setCountCampaigns] = useState(null)
    const [campaignsActive, setCampaignsActive] = useState(null)
    const [customers, setCustomers] = useState([])
    const [customerSelected, setCustomerSelected] = useState(null)

    useEffect(() => {
        getCustomers().then((customers) => {
            setCustomers(customers)
        })
    }, [])

    useEffect(() => {
        if (location.state) {
            getCustomers().then((customers) => {
                const customer = customers.find((c) => c.value === location.state.customerId)
                if (customer) {
                    setCustomerSelected(customer)
                }
            })
        }
    }, [location.state])

    useEffect(() => {
        if (customerSelected === null) return
        getCountCampaign(customerSelected.value)
        getActiveCampaigns(customerSelected.value)
    }, [customerSelected])

    const getCountCampaign = async (customerId) => {
        let { data } = await axios.get(`${endpoint}countCampaigns`, {
            params: { customerId, rol: user.rol },
        })

        setCountCampaigns(data)
    }

    const getActiveCampaigns = async (customerId) => {
        let { data } = await axios.get(`${endpoint}activecampaigns`, {
            params: {
                currentDate: format(new Date(), 'yyyy-MM-dd'),
                customerId,
            },
        })

        setCampaignsActive(data)
    }

    return (
        <>
            <Container maxWidth="xl" style={{ paddingTop: '40px' }}>
                <HeaderPages
                    title="Proyectos - Campañas"
                    breadcrumb={breadcrumb}
                    buttonName="Añadir proyectos/campañas"
                    route="/campaigns/add"
                    customerSelected={customerSelected}
                    setCustomerSelected={setCustomerSelected}
                    customers={customers}
                />

                {customerSelected !== null && (
                    <>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={6}>
                                <CardCampaign
                                    title="Total proyectos - campañas"
                                    description={countCampaigns}
                                />
                            </Grid>
                            <Grid item md={6} xs={6}>
                                <CardCampaign title="En activo" description={campaignsActive} />
                            </Grid>
                        </Grid>
                        <Divider
                            style={{ marginTop: 20, marginBottom: 20, border: '2px solid #b9d47b' }}
                        />

                        {customerSelected && (
                            <CampaignsTable
                                getCountCampaign={() => getCountCampaign(customerSelected.value)}
                                getActiveCampaigns={() =>
                                    getActiveCampaigns(customerSelected.value)
                                }
                                countCampaigns={countCampaigns}
                                customerId={customerSelected.value}
                            />
                        )}
                    </>
                )}
            </Container>
        </>
    )
}
