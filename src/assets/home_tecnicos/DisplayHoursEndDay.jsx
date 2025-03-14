import React from 'react'
import { Box, Divider, Typography, Grid, IconButton } from '@mui/material'
import EventNoteIcon from '@mui/icons-material/EventNote'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { parseDate } from '../components/services/methods'
import EditIcon from '@mui/icons-material/Edit'
import { useNavigate } from 'react-router-dom'

export function DisplayHoursEndDay({ deleteHour, updateHourView, ...item }) {
    const { register_start, register_end, validate, hours, name, type } = item
    const navigate = useNavigate()

    const titleCards = (register_end, validate) => {
        if (register_end === null) {
            return 'INICIO JORNADA'
        }

        switch (validate) {
            case 'Si':
                return 'VALIDADO'
            case 'No':
                return 'INVALIDADO'
            case null:
                return 'SIN VALIDAR'
            case '':
                return 'SIN VALIDAR'
        }
    }

    const handleColorCard = (validate) => {
        switch (validate) {
            case 'VALIDADO':
                return '#8bb925'
            case 'INVALIDADO':
                return 'red'
            case 'SIN VALIDAR':
                return '#805ad5'
        }
    }

    return (
        <>
            <Box
                component={'button'}
                style={{
                    border: `1px solid ${handleColorCard(titleCards(register_end, validate))}`,
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
                                color: handleColorCard(titleCards(register_end, validate)),
                            }}
                        >
                            {titleCards(register_end, validate)}
                        </Typography>
                    </Grid>
                </Grid>

                <Box style={{ display: 'flex' }}>
                    <Grid container spacing={1} justifyContent={'space-between'}>
                        <Grid item md={10} xs={10} display={'flex'}>
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
                                {`${hours} horas - ${type}`}
                                <Typography align="left" variant="body2">
                                    {name}
                                </Typography>
                            </Typography>
                        </Grid>

                        <Grid
                            item
                            md={1}
                            xs={1}
                            style={{ paddingBottom: '15px' }}
                            justifyContent={'center'}
                            alignItems={'center'}
                            display={'flex'}
                            gap={2}
                        >
                            <IconButton
                                disableRipple
                                style={{
                                    padding: 0,
                                    display:
                                        titleCards(register_end, validate) === 'SIN VALIDAR'
                                            ? 'flex'
                                            : 'none',
                                }}
                                onClick={() => updateHourView(item)}
                            >
                                <EditIcon
                                    fontSize="small"
                                    style={{
                                        color: 'white',
                                        backgroundColor: '#bad80a',
                                        padding: '3px',
                                        borderRadius: '8px',
                                    }}
                                />
                            </IconButton>
                            <IconButton
                                disableRipple
                                style={{
                                    padding: 0,
                                    display:
                                        titleCards(register_end, validate) === 'VALIDADO'
                                            ? 'none'
                                            : 'flex',
                                }}
                                onClick={() => deleteHour(item.id)}
                            >
                                <DeleteForeverIcon
                                    fontSize="small"
                                    style={{
                                        color: 'white',
                                        backgroundColor: 'red',
                                        padding: '3px',
                                        borderRadius: '8px',
                                    }}
                                />
                            </IconButton>
                        </Grid>
                    </Grid>
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
