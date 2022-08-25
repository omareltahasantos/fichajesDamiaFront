import React from 'react'
import { Box, Divider, Typography, Grid, IconButton } from '@mui/material'
import EventNoteIcon from '@mui/icons-material/EventNote'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export function DisplayHoursEndDay({ deleteHour, ...item }) {
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
                style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 10,
                    padding: 15,
                    backgroundColor: 'white',
                    width: '1150px',
                    marginBottom: '15px',
                }}
            >
                <Grid container spacing={40}>
                    <Grid item md={9}>
                        <Typography
                            align="left"
                            variant="body2"
                            style={{
                                color:
                                    titleCards(item.register_end, item.validate) ===
                                        'SIN VALIDAR' || 'INVALIDADO'
                                        ? '#805ad5'
                                        : '#8bb925',
                            }}
                        >
                            {titleCards(item.register_end, item.validate)}
                        </Typography>
                    </Grid>
                    <Grid item md={3} style={{ paddingBottom: '15px' }}>
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
                            border:
                                item.validate === '' || item.validate === 'No'
                                    ? '1px solid #805ad5'
                                    : '1px solid #8bb925',
                            marginRight: '10px',
                        }}
                    />
                    <Typography align="left" variant="body1" fontWeight="bold">
                        {`${item.hours} horas`}
                        <Typography align="left" variant="body2">
                            {item.name}
                        </Typography>
                    </Typography>
                </Box>
                <Box style={{ display: 'flex' }}>
                    <Typography align="left" variant="body2" paddingTop="20px" display="flex">
                        <EventNoteIcon style={{ paddingRight: '5px' }} />
                        {item.register_end === null
                            ? `${item.register_start} -`
                            : `${item.register_start} - ${item.register_end}`}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
