import React from 'react'
import { Box, Divider, Typography, Grid, IconButton } from '@mui/material'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'
import { ButtonApp } from '../components/componentsApp/ButtonApp'
import { parseDate } from '../components/services/methods'

export function DisplayHoursStartDay({ registerFinalHours, deleteHour, ...item }) {
    return (
        <>
            <Box
                component="button"
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
                    <Grid item md={9} xs={5}>
                        <Typography
                            align="left"
                            variant="body2"
                            style={{
                                color: '#00b5d8',
                            }}
                        >
                            INICIO JORNADA
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        md={2}
                        xs={6}
                        style={{ paddingBottom: '15px', display: 'flex', justifyContent: 'right' }}
                    >
                        <ButtonApp
                            text={'Finalizar turno'}
                            method={() => registerFinalHours(item.id)}
                        />
                    </Grid>
                    <Grid item md={1} xs={1} style={{ paddingBottom: '15px' }}>
                        <IconButton
                            disableRipple
                            style={{ padding: 0 }}
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

                <Box style={{ display: 'flex' }}>
                    <Divider
                        orientation="vertical"
                        flexItem
                        style={{
                            border: '1px solid #00b5d8',
                            marginRight: '10px',
                        }}
                    />
                    <Typography align="left" variant="body1" fontWeight="bold">
                        {parseDate(item.register_start)}
                        <Typography align="left" variant="body2">
                            {item.name}
                        </Typography>
                    </Typography>
                </Box>
                <Box style={{ display: 'flex' }}>
                    <Typography align="left" variant="body2" paddingTop="20px" display="flex">
                        <ErrorOutlineIcon style={{ paddingRight: '5px' }} />
                        Hay que imputar las horas finales en el mismo dia
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
