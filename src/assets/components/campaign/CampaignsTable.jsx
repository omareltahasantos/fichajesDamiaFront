import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Typography,
    Grid,
} from '@mui/material'
import axios from 'axios'
import endpoint from '../services/endpoint'

import { CampaignsItems } from './CampaignsItems'
import { CampaignsActions } from './CampaignsActions'
import { ExportData } from './ExportData'
import { CampaignSearch } from './CampaignSearch'

export function CampaignsTable({ countCampaigns, getCountCampaign, getActiveCampaigns }) {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        getCampaigns()
    }, [])

    const getCampaigns = async () => {
        let { data } = await axios.get(`${endpoint}campaigns`)

        if (data.length === 0) {
            setCampaigns([])
            return
        }

        setCampaigns(data)
    }

    const deleteCampaign = async (id) => {
        await axios.delete(`${endpoint}campaign/${id}`)
        getCampaigns()
        getCountCampaign()
        getActiveCampaigns()
    }

    const searchCampaign = async (keyword) => {
        let { data } = await axios.get(`${endpoint}searchCampaign`, {
            params: {
                keyword: keyword,
            },
        })

        if (data.length === 0) {
            setCampaigns([])
            return
        }

        setCampaigns(data)
    }

    return (
        <>
            <Typography paddingBottom={1} color="GrayText">
                Buscar:
            </Typography>
            <Grid container spacing={0}>
                <Grid item md={11}>
                    <CampaignSearch
                        countCampaigns={countCampaigns}
                        searchCampaign={searchCampaign}
                    />
                </Grid>
                <ExportData Export={campaigns} />
            </Grid>

            <TableContainer component={Paper} style={{ marginTop: 40 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>DESCRIPCION</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>FECHA INICIO</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>FECHA FINAL</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campaigns.map((camp) => (
                            <TableRow hover>
                                <CampaignsItems {...camp} />
                                <CampaignsActions deleteCampaign={deleteCampaign} {...camp} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
