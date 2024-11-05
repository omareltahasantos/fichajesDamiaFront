import React from 'react'
import { Box, Divider, Typography, Grid, IconButton } from '@mui/material'
import EventNoteIcon from '@mui/icons-material/EventNote'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { parseDate } from '../components/services/methods'

export function DisplayHoursEndDay({ deleteHour, ...item }) {
    const { register_start, register_end, validate, hours, name } = item

    const titleCards = (register_end, validate) => {
        let text = ''
        if (register_end === null) {
            text = 'INICIO JORNADA'
        } else if (validate === null) {
            text = 'SIN VALIDAR'
        } else if (validate === 'Si') {
            text = 'VALIDADO'
        } else {
            text = 'INVALIDADO'
        }

        return text
    }

    return (
        <>
            <Box
                component={'button'}
                style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 10,
                    padding: 15,
                    backgroundColor: 'white',
                    width: '100%',
                    marginBottom: '15px',
                }}
            >
                <Grid container spacing={1}>
                    <Grid item md={11} xs={11}>
                        <Typography
                            align="left"
                            variant="body2"
                            style={{
                                color:
                                    titleCards(register_end, validate) === 'SIN VALIDAR' ||
                                    'INVALIDADO'
                                        ? '#805ad5'
                                        : '#8bb925',
                            }}
                        >
                            {titleCards(register_end, validate)}
                        </Typography>
                    </Grid>
                </Grid>

                <Box style={{ display: 'flex' }}>
                    <Divider
                        orientation="vertical"
                        flexItem
                        style={{
                            border:
                                validate === '' || validate === 'No'
                                    ? '1px solid #805ad5'
                                    : '1px solid #8bb925',
                            marginRight: '10px',
                        }}
                    />
                    <Typography align="left" variant="body1" fontWeight="bold">
                        {`${hours} horas`}
                        <Typography align="left" variant="body2">
                            {name}
                        </Typography>
                    </Typography>
                </Box>
                <Box style={{ display: 'flex' }}>
                    <Typography align="left" variant="body2" paddingTop="20px" display="flex">
                        <EventNoteIcon style={{ paddingRight: '5px' }} />
                        {register_end === null
                            ? `${parseDate(register_start)} -`
                            : `${parseDate(register_start)} - ${parseDate(register_end)}`}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
