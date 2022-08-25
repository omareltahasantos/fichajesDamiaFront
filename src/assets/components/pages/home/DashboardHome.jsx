import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { Container, Grid, Divider, Box, Typography } from '@mui/material'
import { DashbordTitlAndSubtitl } from './DashbordTitlAndSubtitl'
import { ContractHours } from '../../../home_tecnicos/ContractHours'
import { DisplayCampaigns } from './DisplayCampaigns'
import { Footer } from '../../Footer'
import axios from 'axios'

export function DashboardHome() {
    const navigate = useNavigate()
    const endpoint = 'https://smfichajes.herokuapp.com/api/'
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [campaigns, setCampaigns] = useState([])
    useEffect(() => {
        CampaignsCurrentUser()
    }, [])

    const handleCampaign = (id) => {
        navigate(`/horas/${id}`)
    }

    const checkStatusDate = (date_end) => {
        let current_date = new Date()
        let year = current_date.getFullYear()
        let month = current_date.getMonth() + 1
        let day = current_date.getDate()

        if (month < 10) {
            month = `0${month}`
        }

        if (day < 10) {
            day = `0${day}`
        }

        current_date = `${year}-${month}-${day}`

        if (date_end < current_date) {
            return 'FINALIZADO'
        }

        return 'EN ACTIVO'
    }

    const CampaignsCurrentUser = async () => {
        let { data } = await axios.get(`${endpoint}campaigns_current_user`, {
            params: {
                user_id: currentUser.id,
            },
        })

        if (data.length === 0) {
            return
        }

        setCampaigns(data)
    }

    return (
        <>
            <AppBarComponent />
            <Container style={{ paddingTop: '40px' }}>
                <DashbordTitlAndSubtitl />
                <Grid container spacing={0}>
                    <Grid item md={12}>
                        <ContractHours
                            title="Horas contratadas"
                            description={`${currentUser.hours_contract}h /mes`}
                        />
                    </Grid>
                </Grid>
                <Divider style={{ marginTop: 50, marginBottom: 30, border: '2px solid #b9d47b' }} />
                {campaigns.length !== 0
                    ? campaigns.map((item) => (
                          <DisplayCampaigns
                              handleCampaign={handleCampaign}
                              checkStatusDate={checkStatusDate}
                              {...item}
                          />
                      ))
                    : ''}
                <Footer />
            </Container>
        </>
    )
}
