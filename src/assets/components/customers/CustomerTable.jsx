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
import { CustomerSearch } from './CustomerSearch'
import { CircularLoading } from '../componentsApp/CircularLoading'

export function CustomerTable({ getCountCustomers, countCustomers }) {
    const [customers, setCustomers] = useState([])
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = async () => {
        setIsLoading(true)
        let { data } = await axios.get(`${endpoint}customers`)

        if (data.length === 0) {
            setCustomers([])
            return
        }

        setCustomers(data)
        setIsLoading(false)
    }

    const inactiveCustomer = async (id) => {
        await axios.put(`${endpoint}updateActiveCustomer/${id}`, {
            active: 0,
        })
        getCustomers()
        getCountCustomers()
    }

    const searchCustomers = async (keyword) => {
        setIsLoading(true)
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
        setIsLoading(false)
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

            {isloading ? (
                <CircularLoading />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Correo</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <CustomerItems
                                customers={customers}
                                inactiveCustomer={inactiveCustomer}
                            />
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Box sx={{ paddingTop: 5, justifyContent: 'center', display: 'flex' }}>
                <PaginationItems
                    count={countCustomers}
                    setMethod={setCustomers}
                    endpoint={`${endpoint}customer/paginate`}
                    setLoading={setIsLoading}
                />
            </Box>
        </>
    )
}
