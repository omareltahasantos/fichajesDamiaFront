import React from 'react'
import { Box, Divider, Typography } from '@mui/material'
import EventNoteIcon from '@mui/icons-material/EventNote'

export function DisplayCampaigns({ handleCampaign, checkStatusDate, ...item }) {
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
                    cursor: 'pointer',
                }}
                onClick={() => {
                    if (checkStatusDate(item.date_end) === 'EN ACTIVO') {
                        handleCampaign(item.id)
                    }
                }}
            >
                <Typography
                    align="left"
                    variant="body1"
                    style={{
                        color:
                            checkStatusDate(item.date_end) === 'EN ACTIVO' ? '#89ae45' : '#ee8383',
                    }}
                >
                    {checkStatusDate(item.date_end)}
                </Typography>
                <Divider
                    style={{
                        marginTop: 5,
                        marginBottom: 10,
                        border: '1px solid #eceff1',
                    }}
                />
                <Box style={{ display: 'flex' }}>
                    <Divider
                        orientation="vertical"
                        flexItem
                        style={{
                            border:
                                checkStatusDate(item.date_end) === 'EN ACTIVO'
                                    ? '2px solid #89ae45'
                                    : '2px solid #ee8383',
                            marginRight: '10px',
                        }}
                    />
                    <Typography align="left" variant="body1" fontWeight="bold">
                        {item.name}
                        <Typography align="left" variant="body2">
                            {item.description}
                        </Typography>
                    </Typography>
                </Box>
                <Box style={{ display: 'flex' }}>
                    <Typography align="left" variant="body2" paddingTop="20px" display="flex">
                        <EventNoteIcon style={{ paddingRight: '5px' }} />
                        {`${item.date_start} - ${item.date_end}`}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}
