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
import { CustomerActions } from './CustomerActions'

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
                <TableContainer component={Paper} style={{ marginTop: 40 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>CÓDIGO</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>ESTADO</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.length > 0 &&
                                customers.map((customer) => (
                                    <>
                                        <TableRow key={customer.id}>
                                            <CustomerItems {...customer} />
                                            <CustomerActions
                                                {...customer}
                                                inactiveCustomer={inactiveCustomer}
                                            />
                                        </TableRow>
                                    </>
                                ))}
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
