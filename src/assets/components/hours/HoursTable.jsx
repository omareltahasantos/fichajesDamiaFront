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
import { HoursTableHeader } from './HoursTableHeader'
import { HoursItems } from './HoursItems'
import { HoursActions } from './HoursActions'
import { HoursSearch } from './HoursSearch'
import { PaginationItems } from '../PaginationItems'

export function HoursTable({ totalHoursValidate, hoursInsertedCurrentMonth, toDate, fromDate }) {
    const [hours, setHours] = useState([])
    const [countHours, setCountHours] = useState(0)

    useEffect(() => {
        getHours()
        getCountHours()
    }, [])

    const getHours = async () => {
        let { data } = await axios.get(`${endpoint}hours`)

        if (data.length === 0) {
            setHours([])
            return
        }

        setHours(data)
    }
    const getCountHours = async () => {
        try {
            let { data } = await axios.get(`${endpoint}countHours`)

            if (data) {
                setCountHours(data)
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const deleteHour = async (id) => {
        await axios.delete(`${endpoint}hour/${id}`)
        getHours()
        hoursInsertedCurrentMonth(fromDate, toDate)
        totalHoursValidate(fromDate, toDate)
    }

    const updateValidate = async (id, state) => {
        let { data } = await axios.put(`${endpoint}hour/${id}`, {
            state: state,
        })

        getHours()
    }

    const searchHours = async (keyword) => {
        let { data } = await axios.get(`${endpoint}searchHours`, {
            params: {
                keyword: keyword,
            },
        })

        if (data.length === 0) {
            setHours([])
            return
        }

        setHours(data)
    }

    return (
        <>
            <Typography paddingBottom={1} color="GrayText">
                Buscar:
            </Typography>
            <Grid container spacing={0}>
                <Grid item md={11}>
                    <HoursSearch countHoursInserted={countHours} searchHours={searchHours} />
                </Grid>
                <ExportData Export={hours} />
            </Grid>

            <TableContainer component={Paper} style={{ marginTop: 40 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <HoursTableHeader />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hours.map((hour) => (
                            <TableRow hover>
                                <HoursItems {...hour} />
                                <HoursActions
                                    deleteHour={deleteHour}
                                    updateValidate={updateValidate}
                                    {...hour}
                                />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ paddingTop: 5, justifyContent: 'center', display: 'flex' }}>
                <PaginationItems
                    count={countHours}
                    setMethod={setHours}
                    endpoint={`${endpoint}paginateHours`}
                />
            </Box>
        </>
    )
}
