import React, { useState, useEffect } from 'react'
import { Link, Typography, Container, Grid, Divider } from '@mui/material'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router'
import { HeaderPages } from '../../HeaderPages'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { CardHour } from '../../hours/CardHours'
import axios from 'axios'
import { HoursTable } from '../../hours/HoursTable'
import endpoint from '../../services/endpoint'
import getCustomers from '../../services/methods'

export function Hours() {
    const navigate = useNavigate()
    const location = useLocation()

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
    const [hoursValidate, setHoursValidate] = useState(0)
    const [countHoursInsertedCurrentMonth, setCountHoursInsertedCurrentMonth] = useState(0)

    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [customers, setCustomers] = useState([])
    const [customerSelected, setCustomerSelected] = useState(null)

    useEffect(() => {
        getCustomers().then((customers) => {
            setCustomers(customers)
        })
    }, [])

    useEffect(() => {
        if (location.state === null) return
        setCustomerSelected(location.state.customerId)
    }, [location?.state?.customerId])

    useEffect(() => {
        if (customerSelected === null) return
        startEndDate(new Date(), customerSelected)
    }, [customerSelected])

    const startEndDate = (currentDate, customerId) => {
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

        totalHoursValidate(from, to, customerId)
        hoursInsertedCurrentMonth(from, to, customerId)

        setFromDate(from)
        setToDate(to)
    }

    const totalHoursValidate = async (from, to, customerId) => {
        let { data } = await axios.get(`${endpoint}validateHours`, {
            params: {
                from: from,
                to: to,
                customerId: customerId,
            },
        })

        setHoursValidate(data)
    }

    const hoursInsertedCurrentMonth = async (from, to, customerId) => {
        let { data } = await axios.get(`${endpoint}insertedHours`, {
            params: {
                from: from,
                to: to,
                customerId: customerId,
            },
        })

        setCountHoursInsertedCurrentMonth(data)
    }

    return (
        <>
            <Container style={{ paddingTop: '40px' }}>
                <HeaderPages
                    title="Horas"
                    breadcrumb={breadcrumb}
                    customerSelected={customerSelected}
                    setCustomerSelected={setCustomerSelected}
                    customers={customers}
                />
                {customerSelected !== null && (
                    <>
                        <Grid container spacing={2}>
                            <Grid item md={6} xs={6}>
                                <CardHour
                                    title="Total horas validadas - Ultimo mes"
                                    description={`${hoursValidate}H`}
                                />
                            </Grid>
                            <Grid item md={6} xs={6}>
                                <CardHour
                                    title="Total imputaciones - Ultimo mes"
                                    description={`${countHoursInsertedCurrentMonth}`}
                                />
                            </Grid>
                        </Grid>
                        <Divider
                            style={{ marginTop: 20, marginBottom: 20, border: '2px solid #b9d47b' }}
                        />
                        <HoursTable
                            totalHoursValidate={() =>
                                totalHoursValidate(fromDate, toDate, customerSelected)
                            }
                            hoursInsertedCurrentMonth={() =>
                                hoursInsertedCurrentMonth(fromDate, toDate, customerSelected)
                            }
                            toDate={toDate}
                            fromDate={fromDate}
                            customerId={customerSelected}
                        />
                    </>
                )}
            </Container>
        </>
    )
}
