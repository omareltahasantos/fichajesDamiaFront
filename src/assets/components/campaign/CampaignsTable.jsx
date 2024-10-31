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
    Box,
} from '@mui/material'
import axios from 'axios'
import endpoint from '../services/endpoint'
import { CampaignsItems } from './CampaignsItems'
import { CampaignsActions } from './CampaignsActions'
import { ExportData } from './ExportData'
import { CampaignSearch } from './CampaignSearch'
import { PaginationItems } from '../PaginationItems'

export function CampaignsTable({
    countCampaigns,
    getCountCampaign,
    getActiveCampaigns,
    customerId,
}) {
    const [campaigns, setCampaigns] = useState([])

    useEffect(() => {
        getCampaigns(customerId)
    }, [customerId])

    const getCampaigns = async (customerId) => {
        let { data } = await axios.get(`${endpoint}campaigns`, {
            params: {
                customerId: customerId,
            },
        })

        if (data.length === 0) {
            setCampaigns([])
            return
        }

        setCampaigns(data)
    }

    const inactiveCampaign = async (id) => {
        let data = await axios.put(`${endpoint}updateActiveCampaign/${id}`, {
            active: 0,
        })

        getCampaigns(customerId)
        getCountCampaign()
        getActiveCampaigns()
    }

    const searchCampaign = async (keyword) => {
        let { data } = await axios.get(`${endpoint}searchCampaign`, {
            params: {
                keyword: keyword,
                customerId: customerId,
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
                <Grid item md={11} xs={10}>
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
                            <TableCell style={{ fontWeight: 'bold' }}>ESTADO</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {campaigns.map((camp) => (
                            <TableRow hover>
                                <CampaignsItems {...camp} />
                                <CampaignsActions
                                    customerId={customerId}
                                    inactiveCampaign={inactiveCampaign}
                                    {...camp}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ paddingTop: 5, justifyContent: 'center', display: 'flex' }}>
                <PaginationItems
                    count={countCampaigns}
                    setMethod={setCampaigns}
                    endpoint={`${endpoint}paginateCampaigns`}
                    customerId={customerId}
                />
            </Box>
        </>
    )
}
