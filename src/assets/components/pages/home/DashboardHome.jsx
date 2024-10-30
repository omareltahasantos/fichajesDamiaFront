import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { Container, Grid, Divider, Box, Typography } from '@mui/material'
import { DashbordTitlAndSubtitl } from './DashbordTitlAndSubtitl'
import { ContractHours } from '../../../home_tecnicos/ContractHours'
import { DisplayCampaigns } from './DisplayCampaigns'
import { Footer } from '../../Footer'
import axios from 'axios'
import endpoint from '../../services/endpoint'
import AppContainer from '../../appbar/AppContainer'

export function DashboardHome() {
    const navigate = useNavigate()
    const [currentUser, setCurrentUser] = useState(JSON.parse(sessionStorage.getItem('user')))
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        CampaignsCurrentUser()
    }, [])

    const handleCampaign = (id) => {
        navigate(`/horas/${id}`)
    }

    const checkStatusDate = (date_end) => {
        const current_date = new Date()
        const formatted_date = current_date.toISOString().split('T')[0] // Formato YYYY-MM-DD

        return date_end < formatted_date ? 'FINALIZADO' : 'EN ACTIVO'
    }

    const CampaignsCurrentUser = async () => {
        try {
            const { data } = await axios.get(`${endpoint}campaigns_current_user`, {
                params: { user_id: currentUser.id },
            })

            if (data.length > 0) {
                setCampaigns(data)
            }
        } catch (error) {
            console.error('Error fetching campaigns:', error)
        }
    }

    return (
        <Container style={{ paddingTop: '40px' }}>
            <DashbordTitlAndSubtitl />
            <Grid container spacing={0}>
                <Grid item md={12} xs={12}>
                    <ContractHours
                        title="Horas contratadas"
                        description={`${currentUser.hours_contract}h /mes`}
                    />
                </Grid>
            </Grid>
            <Divider style={{ marginTop: 50, marginBottom: 30, border: '2px solid #b9d47b' }} />
            {campaigns.length > 0 ? (
                campaigns.map((item) => (
                    <DisplayCampaigns
                        key={item.id} // Asegúrate de tener una clave única
                        handleCampaign={handleCampaign}
                        checkStatusDate={checkStatusDate}
                        {...item}
                    />
                ))
            ) : (
                <Typography variant="body1" align="center">
                    No hay campañas disponibles.
                </Typography>
            )}
        </Container>
    )
}
