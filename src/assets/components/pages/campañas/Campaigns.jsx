import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { Grid, Typography, Container, Link, Divider } from '@mui/material'
import { CardCampaign } from '../../campaign/CardCampaign'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { CampaignsTable } from '../../campaign/CampaignsTable'
import { Footer } from '../../Footer'
import { HeaderPages } from '../../HeaderPages'

export function Campaigns() {
    const endpoint = 'http://localhost:8000/api/'
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
        <Typography style={{ fontWeight: 'bold' }}>Campañas</Typography>,
    ]

    const [user, setUser] = useState(null)
    const [countCampaigns, setCountCampaigns] = useState(null)
    const [campaignsActive, setCampaignsActive] = useState(null)

    useEffect(() => {
        currentUser()
        getCountCampaign()
        getActiveCampaigns()
    }, [])

    const currentUser = () => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        setUser(user)
    }

    const getCountCampaign = async () => {
        let { data } = await axios.get(`${endpoint}campaigns`)

        if (data.length === 0) {
            setCountCampaigns(0)
            return
        }
        setCountCampaigns(data.length)
    }

    const getActiveCampaigns = async () => {
        let current_date = new Date()
        let { data } = await axios.get(`${endpoint}activecampaigns`, {
            params: {
                current_date: `${current_date.getFullYear()}-${
                    current_date.getMonth() + 1
                }-${current_date.getDate()}`,
            },
        })

        if (data.length === 0) {
            setCampaignsActive(0)
            return
        }
        setCampaignsActive(data.length)
    }

    return (
        <>
            <AppBarComponent />
            <Container style={{ paddingTop: '40px' }}>
                <HeaderPages
                    title="Campañas"
                    breadcrumb={breadcrumb}
                    buttonName="Añadir campañas"
                    route="/campaigns/add"
                />
                <Grid container spacing={0}>
                    <Grid item md={6}>
                        <CardCampaign title="Total campañas" description={countCampaigns} />
                    </Grid>
                    <Grid item md={6}>
                        <CardCampaign title="En activo" description={campaignsActive} />
                    </Grid>
                </Grid>
                <Divider style={{ marginTop: 50, marginBottom: 30, border: '2px solid #b9d47b' }} />
                {/*CREAR BUSCADOR MAS EXPORTAR*/}

                <CampaignsTable
                    getCountCampaign={getCountCampaign}
                    getActiveCampaigns={getActiveCampaigns}
                    countCampaigns={countCampaigns}
                />
            </Container>
            <Footer />
        </>
    )
}
