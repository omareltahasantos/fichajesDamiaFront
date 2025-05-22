import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router'
import { Grid, Typography, Container, Link, Divider } from '@mui/material'
import { CardCampaign } from '../../campaign/CardCampaign'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { CampaignsTable } from '../../campaign/CampaignsTable'
import { Footer } from '../../Footer'
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
        <Typography style={{ fontWeight: 'bold' }}>Campañas</Typography>,
    ]

    const [countCampaigns, setCountCampaigns] = useState(null)
    const [campaignsActive, setCampaignsActive] = useState(null)
    const [customers, setCustomers] = useState([])
    const [customerSelected, setCustomerSelected] = useState(null)

    useEffect(() => {
        getCustomers().then((customers) => {
            console.log(customers)
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
        getCountCampaign(customerSelected)
        getActiveCampaigns(customerSelected)
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
                    title="Campañas"
                    breadcrumb={breadcrumb}
                    buttonName="Añadir campañas"
                    route="/campaigns/add"
                    customerSelected={customerSelected}
                    setCustomerSelected={setCustomerSelected}
                    customers={customers}
                />

                {customerSelected !== null && (
                    <>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={6}>
                                <CardCampaign title="Total campañas" description={countCampaigns} />
                            </Grid>
                            <Grid item md={6} xs={6}>
                                <CardCampaign title="En activo" description={campaignsActive} />
                            </Grid>
                        </Grid>
                        <Divider
                            style={{ marginTop: 20, marginBottom: 20, border: '2px solid #b9d47b' }}
                        />

                        <CampaignsTable
                            getCountCampaign={() => getCountCampaign(customerSelected)}
                            getActiveCampaigns={() => getActiveCampaigns(customerSelected)}
                            countCampaigns={countCampaigns}
                            customerId={customerSelected}
                        />
                    </>
                )}
            </Container>
        </>
    )
}
