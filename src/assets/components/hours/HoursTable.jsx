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
import { ExportData } from '../campaign/ExportData'
import { HoursTableHeader } from './HoursTableHeader'
import { HoursItems } from './HoursItems'
import { HoursActions } from './HoursActions'
import { HoursSearch } from './HoursSearch'

export function HoursTable({
    totalHoursValidate,
    hoursInserted,
    toDate,
    fromDate,
    countHoursInserted,
}) {
    const endpoint = 'https://smfichajes.herokuapp.com/api/'
    const [hours, setHours] = useState([])

    useEffect(() => {
        getHours()
    }, [])

    const getHours = async () => {
        let { data } = await axios.get(`${endpoint}hours`)

        if (data.length === 0) {
            setHours([])
            return
        }

        setHours(data)
    }

    const deleteHour = async (id) => {
        await axios.delete(`${endpoint}hour/${id}`)
        getHours()
        hoursInserted(fromDate, toDate)
        totalHoursValidate(fromDate, toDate)
    }

    const updateValidate = async (id, state) => {
        let { data } = await axios.put(`${endpoint}hour/${id}`, {
            state: state,
        })

        console.log(data)

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
                    {
                        <HoursSearch
                            countHoursInserted={countHoursInserted}
                            searchHours={searchHours}
                        />
                    }
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
        </>
    )
}
