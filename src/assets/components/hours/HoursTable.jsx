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
    const [exportHours, setExportHours] = useState([])
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

    useEffect(() => {
        parseHoursToExport(hours)
    }, [hours])

    const parseHoursToExport = (hours) => {
        let parseValidate = (validate) => {
            if (validate === '' || validate === null) return 'No validado'
            if (validate === 'Si') return 'Validado'
            if (validate === 'No') return 'Rechazado'
        }

        setExportHours(
            hours.map((hour) => {
                let startDate = hour.register_start
                    ? hour?.register_start?.split(' ')
                    : ['Sin iniciar', '']
                let endDate = hour.register_end
                    ? hour?.register_end?.split(' ')
                    : ['Sin finalizar', '']
                return {
                    Técnico: hour.user,
                    Campaña: hour.campaign,
                    'Fichaje inicio': `${startDate[0].split('-').reverse().join('-')} ${
                        startDate[1]
                    }`,
                    'Ubicación inicio': hour.ubication_start,
                    'Fichaje final': `${endDate[0].split('-').reverse().join('-')} ${endDate[1]}`,
                    'Ubicación final': hour.ubication_end,
                    'Horas imputadas': hour.hours,
                    'Horas trabajadas': hour.worked_hours,
                    'Tipo de hora': hour.type,
                    Validado: parseValidate(hour.validate),
                    'Validado por': hour.validate_by,
                }
            })
        )
    }

    const getCountHours = async (customerId) => {
        let { data } = await axios.get(`${endpoint}countHours`, {
            params: { customerId: customerId },
        })

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

        if (data.length === 0) {
            setHours([])
            return
        }

        let hours = []

        data.forEach((hour) => {
            let startDate = hour.register_start.split(' ')
            let endDate = hour.register_end
            let worked_hours = 0

            console.log(startDate)
            console.log(endDate)

            if (endDate === null) {
                worked_hours = 'Sin finalizar'
                hours.push({
                    ...hour,
                    worked_hours: worked_hours,
                })
                return
            }

            endDate = endDate.split(' ')

            worked_hours =
                new Date(endDate[0] + ' ' + endDate[1]) -
                new Date(startDate[0] + ' ' + startDate[1])

            worked_hours = worked_hours / 1000 / 60 / 60

            hours.push({
                ...hour,
                worked_hours: worked_hours % 1 !== 0 ? worked_hours.toFixed(2) : worked_hours,
            })
        })

        setHours(hours)
        setCountHours(hours.length)
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
                    <ExportData Export={exportHours} />
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
                                    customerId={customerId}
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
