import React, { useState } from 'react'
import { Box, Typography } from '@mui/material'
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

const containerStyle = {
    border: '1px solid #e0e0e0',
    borderRadius: 5,
    padding: 20,
    backgroundColor: 'white',
    cursor: 'pointer',
    transition: 'all 0.3s',
    width: 'auto',
    height: 'auto',
    minWidth: '425px',
    minHeight: '125px',
}

export function CardDashboard({ ...props }) {
    const classes = useStyles()
    const navigate = useNavigate()
    const [onCard, setOnCard] = useState(false)

    const handleOnFocus = () => {
        setOnCard(true)
    }
    const handleOnBlur = () => {
        setOnCard(false)
    }

    const handlePage = () => {
        let title = props.title
        console.log(title)
        title = title.toLowerCase()

        if (title === 'campañas') {
            title = 'campaigns'
        }
        if (title === 'fichar') {
            title = 'homeTecnicos'
        }
        navigate(`/${title}`)
    }
    return (
        <>
            <Box
                component="button"
                style={containerStyle}
                onMouseEnter={handleOnFocus}
                onMouseLeave={handleOnBlur}
                onClick={handlePage}
            >
                <Typography
                    variant="h5"
                    style={{ fontWeight: 'bold' }}
                    className={onCard ? classes.hover : ''}
                >
                    {props.title}
                    {<ArrowForwardIcon fontSize="medium" />}
                </Typography>
                <Typography
                    variant="body1"
                    color="greyText"
                    style={{ paddingTop: 14 }}
                    className={onCard ? classes.hover : ''}
                >
                    {props.description}
                </Typography>
            </Box>
        </>
    )
}
