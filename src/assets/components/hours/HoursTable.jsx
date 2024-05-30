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
import { CircularLoading } from '../componentsApp/CircularLoading'
import { TextFieldApp } from '../componentsApp/TextFieldApp'

export function HoursTable({ totalHoursValidate, hoursInsertedCurrentMonth, toDate, fromDate }) {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const [hours, setHours] = useState([])
    const [countHours, setCountHours] = useState(0)
    const [keyword, setKeyword] = useState('')
    const [filter, setFilter] = useState('todos')
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        searchHours(keyword, filter)
        getCountHours()
    }, [])

    useEffect(() => {
        if (firstDate === '' && secondDate === '') {
            searchHours(keyword, filter)
            return
        }

        if (firstDate !== '' && secondDate !== '') {
            searchHours(keyword, filter, firstDate, secondDate)
        }
    }, [keyword, filter, firstDate, secondDate])

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
        searchHours(keyword, filter)
        hoursInsertedCurrentMonth(fromDate, toDate)
        totalHoursValidate(fromDate, toDate)
    }

    const updateValidate = async (id, state) => {
        let { data } = await axios.put(`${endpoint}hour/${id}`, {
            state: state,
            validateBy: user.name,
        })

        searchHours(keyword, filter)
    }

    const searchHours = async (keyword, filter, firstDate = '', secondDate = '') => {
        setIsLoading(true)

        let { data } = await axios.get(`${endpoint}searchHours`, {
            params: {
                keyword: keyword,
                filter: filter,
                firstDate,
                secondDate,
            },
        })

        setIsLoading(false)

        if (data.length === 0) {
            setHours([])
            return
        }

        setHours(data)
    }

    return (
        <>
            <Grid container spacing={5} justifyContent={'space-between'}>
                <Grid item md={4}>
                    <Typography paddingBottom={1} color="GrayText">
                        Buscar:
                    </Typography>
                    <HoursSearch countHoursInserted={countHours} saveKeyword={setKeyword} />
                </Grid>
                <Grid item md={2}>
                    <Typography paddingBottom={1} color="GrayText">
                        Filtrar:
                    </Typography>
                    <HoursValidateFilter saveFilter={setFilter} />
                </Grid>
                <Grid item md={2}>
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
                <Grid item md={2}>
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

                <Grid item md={2}>
                    <ExportData Export={hours} />
                </Grid>
            </Grid>
            {isLoading ? (
                <CircularLoading />
            ) : (
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
            )}
        </>
    )
}
