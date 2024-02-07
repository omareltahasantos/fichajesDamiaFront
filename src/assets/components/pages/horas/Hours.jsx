import React, { useState, useEffect } from 'react'
import { Link, Typography, Container, Grid, Divider } from '@mui/material'
import { useNavigate } from 'react-router'
import { HeaderPages } from '../../HeaderPages'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { CardHour } from '../../hours/CardHours'
import axios from 'axios'
import { HoursTable } from '../../hours/HoursTable'
import endpoint from '../../services/endpoint'

export function Hours() {
    const navigate = useNavigate()
    const breadcrumb = [
        <Link
            underline="hover"
            key="1"
            color="inherit"
            onClick={() => {
                navigate('/')
            }}
        >
            Home
        </Link>,
        <Typography style={{ fontWeight: 'bold' }}>Horas</Typography>,
    ]
    const [hoursValidate, setHoursValidate] = useState(1)
    const [countHoursInsertedCurrentMonth, setCountHoursInsertedCurrentMonth] = useState(1)
    const [currentDate, setCurrentDate] = useState(new Date())

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')

    useEffect(() => {
        startEndDate()
    }, [currentDate])

    const startEndDate = () => {
        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        if (day < 10) {
            day = '0' + day
        }
        if (month < 10) {
            month = '0' + month
        }

        let from = year + '-' + month + '-01'
        let to = year + '-' + month + '-31'

        totalHoursValidate(from, to)
        hoursInsertedCurrentMonth(from, to)

        setFromDate(from)
        setToDate(to)
    }

    const totalHoursValidate = async (from, to) => {
        let { data } = await axios.get(`${endpoint}validateHours`, {
            params: {
                from: from,
                to: to,
            },
        })

        setHoursValidate(data)
    }

    const hoursInsertedCurrentMonth = async (from, to) => {
        let { data } = await axios.get(`${endpoint}insertedHours`, {
            params: {
                from: from,
                to: to,
            },
        })

        setCountHoursInsertedCurrentMonth(data)
    }

    return (
        <>
            <AppBarComponent />
            <Container style={{ paddingTop: '40px' }}>
                <HeaderPages title="Horas" breadcrumb={breadcrumb} />
                <Grid container spacing={0}>
                    <Grid item md={6}>
                        <CardHour
                            title="Total horas validadas - Ultimo mes"
                            description={`${hoursValidate}H`}
                        />
                    </Grid>
                    <Grid item md={6}>
                        <CardHour
                            title="Total imputaciones - Ultimo mes"
                            description={`${countHoursInsertedCurrentMonth}`}
                        />
                    </Grid>
                </Grid>
                <Divider style={{ marginTop: 50, marginBottom: 30, border: '2px solid #b9d47b' }} />
                <HoursTable
                    totalHoursValidate={totalHoursValidate}
                    hoursInsertedCurrentMonth={hoursInsertedCurrentMonth}
                    toDate={toDate}
                    fromDate={fromDate}
                />
            </Container>
        </>
    )
}
