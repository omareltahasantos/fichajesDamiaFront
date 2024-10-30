import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
    Paper,
    Typography,
    Grid,
} from '@mui/material'
import axios from 'axios'
import endpoint from '../services/endpoint'
import { ExportData } from '../campaign/ExportData'
import { HoursTableHeader } from './HoursTableHeader'
import { HoursItems } from './HoursItems'
import { HoursActions } from './HoursActions'
import { HoursSearch } from './HoursSearch'
import { HoursValidateFilter } from './HoursValidateFilter'
import { TextFieldApp } from '../componentsApp/TextFieldApp'

export function HoursTable({ totalHoursValidate, hoursInsertedCurrentMonth, customerId }) {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [hours, setHours] = useState([])
    const [countHours, setCountHours] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [filter, setFilter] = useState('todos')
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')

    useEffect(() => {
        searchHours(keyword, filter, firstDate, secondDate, customerId)
        getCountHours(customerId)
    }, [customerId])

    useEffect(() => {
        searchHours(keyword, filter, firstDate, secondDate, customerId)
    }, [keyword, filter, firstDate, secondDate])

    const getCountHours = async (customerId) => {
        let { data } = await axios.get(`${endpoint}countHours`, {
            params: { customerId: customerId },
        })

        console.log(data)

        setCountHours(data)
    }

    const deleteHour = async (id) => {
        await axios.delete(`${endpoint}hour/${id}`)
        searchHours(keyword, filter, firstDate, secondDate, customerId)
        hoursInsertedCurrentMonth()
        totalHoursValidate()
    }

    const updateValidate = async (id, state) => {
        let { data } = await axios.put(`${endpoint}hour/${id}`, {
            state: state,
            validateBy: user.name,
        })

        hoursInsertedCurrentMonth()
        totalHoursValidate()
        searchHours(keyword, filter, firstDate, secondDate, customerId)
    }

    const searchHours = async (keyword, filter, firstDate, secondDate, customerId) => {
        const json =
            firstDate === '' || secondDate === ''
                ? {
                      keyword: keyword,
                      filter: filter,
                      customerId: customerId,
                  }
                : {
                      keyword: keyword,
                      filter: filter,
                      firstDate: firstDate,
                      secondDate: secondDate,
                      customerId: customerId,
                  }

        let { data } = await axios.get(`${endpoint}searchHours`, {
            params: json,
        })

        setHours(data.length === 0 ? [] : data)
        setCountHours(data.length)
    }

    return (
        <>
            <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item md={4} xs={6}>
                    <Typography paddingBottom={1} color="GrayText">
                        Buscar:
                    </Typography>
                    <HoursSearch countHoursInserted={countHours} saveKeyword={setKeyword} />
                </Grid>
                <Grid item md={2} xs={6}>
                    <Typography paddingBottom={1} color="GrayText">
                        Filtrar:
                    </Typography>
                    <HoursValidateFilter saveFilter={setFilter} />
                </Grid>
                <Grid item md={2} xs={5}>
                    <Typography paddingBottom={1} color="GrayText">
                        Fecha inicio:
                    </Typography>
                    <TextFieldApp
                        type={'date'}
                        state={firstDate}
                        isOneState={true}
                        method={setFirstDate}
                        label={''}
                    />
                </Grid>
                <Grid item md={2} xs={5}>
                    <Typography paddingBottom={1} color="GrayText">
                        Fecha final:
                    </Typography>
                    <TextFieldApp
                        type={'date'}
                        state={secondDate}
                        isOneState={true}
                        method={setSecondDate}
                        label={''}
                    />
                </Grid>

                <Grid item md={2} xs={2}>
                    <Typography>Exportar:</Typography>
                    <ExportData Export={hours} />
                </Grid>
            </Grid>
            <TableContainer component={Paper} style={{ marginTop: 40 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <HoursTableHeader setHours={setHours} hours={hours} />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {hours?.map((hour) => (
                            <TableRow hover key={hour.id}>
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
