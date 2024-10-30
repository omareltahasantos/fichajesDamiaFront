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
import { ExportData } from '../campaign/ExportData'
import { PaginationItems } from '../PaginationItems'
import { CustomerItems } from './CustomerItems'
import { CustomerActions } from './CustomerActions'
import { CustomerSearch } from './CustomerSearch'

export function CustomerTable({ getCountCustomers, countCustomers }) {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = async () => {
        let { data } = await axios.get(`${endpoint}customers`)

        if (data.length === 0) {
            setCustomers([])
            return
        }

        setCustomers(data)
    }

    const deleteCustomer = async (id) => {
        await axios.delete(`${endpoint}customer/${id}`)
        getCustomers()
        getCountCustomers()
    }

    const searchCustomers = async (keyword) => {
        let { data } = await axios.get(`${endpoint}searchCustomers`, {
            params: {
                keyword: keyword,
            },
        })

        if (data.length === 0) {
            setCustomers([])
            return
        }

        setCustomers(data)
    }

    return (
        <>
            <Typography paddingBottom={1} color="GrayText">
                Buscar:
            </Typography>
            <Grid container spacing={0}>
                <Grid item md={11} xs={10}>
                    <CustomerSearch
                        countCustomers={countCustomers}
                        searchCustomers={searchCustomers}
                    />
                </Grid>
                <ExportData Export={customers} />
            </Grid>

            <TableContainer component={Paper} style={{ marginTop: 20 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.length > 0 &&
                            customers?.map((customer) => (
                                <TableRow hover>
                                    <CustomerItems {...customer} />
                                    <CustomerActions
                                        deleteCustomer={deleteCustomer}
                                        {...customer}
                                    />
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ paddingTop: 5, justifyContent: 'center', display: 'flex' }}>
                <PaginationItems
                    count={countCustomers}
                    setMethod={setCustomers}
                    endpoint={`${endpoint}customer/paginate`}
                />
            </Box>
        </>
    )
}
