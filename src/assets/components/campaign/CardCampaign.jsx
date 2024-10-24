import React, { useState, useEffect } from 'react'
import { Box, Typography, CircularProgress } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate, Link as LinkR } from 'react-router'

const useStyles = makeStyles({
    hover: {
        '&:hover': {
            color: '#8BB925',
        },
        color: '#8BB925',
    },
})
export function CardCampaign({ ...props }) {
    return (
        <>
            <Box
                component="button"
                style={{
                    border: '1px solid #e0e0e0',
                    borderRadius: 10,
                    padding: 15,
                    backgroundColor: 'white',
                    width: '560px',
                }}
            >
                <Typography variant="body1" align="left" style={{ color: 'grey' }}>
                    {props.title}
                </Typography>
                <Typography
                    variant="h6"
                    color="greyText"
                    align="left"
                    style={{ paddingTop: 7, fontWeight: 'bold' }}
                >
                    {props.description === null || props.description === 'null' ? (
                        <CircularProgress />
                    ) : (
                        props.description
                    )}
                </Typography>
            </Box>
        </>
    )
}
