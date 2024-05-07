import { Grid, IconButton, Tooltip } from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'
import GetAppIcon from '@mui/icons-material/GetApp'
import { ModalApp } from '../componentsApp/ModalApp'
import { TextFieldApp } from '../componentsApp/TextFieldApp'
import { ButtonApp } from '../componentsApp/ButtonApp'
import axios from 'axios'
import endpoint from '../services/endpoint'
import { ExportData } from '../campaign/ExportData'

export function ExportBetweenHoursModal() {
    const [show, setShow] = useState(false)

    return (
        <>
            <Tooltip title="Exportar datos" arrow placement="top">
                <IconButton
                    variant="contained"
                    style={{
                        marginLeft: 10,
                        backgroundColor: '#8bb925',
                        color: 'white',
                        marginTop: 7,
                    }}
                    onClick={() => setShow(!show)}
                >
                    <GetAppIcon />
                </IconButton>
            </Tooltip>

            <ModalApp
                show={show}
                handleClose={() => setShow(!show)}
                title={'EXPORTAR REGISTROS'}
                children={<ExportbetweenDates />}
            />
        </>
    )
}

const ExportbetweenDates = () => {
    const [hours, setHours] = useState('')
    const [firstDate, setFirstDate] = useState('')
    const [secondDate, setSecondDate] = useState('')

    useEffect(() => {
        if (firstDate === '' || secondDate === '') return
        filterHours(firstDate, secondDate)
    }, [firstDate, secondDate])

    const filterHours = async (firstDate, secondDate) => {
        let { data } = await axios.get(`${endpoint}searchHoursBetweenDates`, {
            params: {
                firstDate,
                secondDate,
            },
        })

        console.log(data)

        if (data.length === 0) {
            setHours([])
            return
        }

        setHours(data)
    }

    return (
        <>
            <Grid container spacing={5} justifyContent={'center'}>
                <Grid item md={6}>
                    <TextFieldApp
                        type={'date'}
                        state={firstDate}
                        isOneState={true}
                        method={setFirstDate}
                        label={'Selecciona fecha de inicio'}
                    />
                </Grid>
                <Grid item md={6}>
                    <TextFieldApp
                        type={'date'}
                        state={secondDate}
                        isOneState={true}
                        method={setSecondDate}
                        label={'Selecciona fecha de fin'}
                    />
                </Grid>
                <Grid item md={3}>
                    <ExportData Export={hours} />
                </Grid>
            </Grid>
        </>
    )
}
