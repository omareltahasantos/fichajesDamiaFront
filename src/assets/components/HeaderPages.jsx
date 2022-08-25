import React from 'react'
import { Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { useNavigate } from 'react-router'
import AddIcon from '@mui/icons-material/Add'

export function HeaderPages({ title, breadcrumb, buttonName, route }) {
    const navigate = useNavigate()
    return (
        <>
            <Grid container spacing={3} flexDirection="column" style={{ paddingBottom: '40px' }}>
                <Grid item md={3}>
                    <Typography
                        variant="h4"
                        style={{ fontWeight: 'bold', fontFamily: 'sans-serif' }}
                    >
                        {title}
                    </Typography>
                </Grid>
                <Grid item md={3}>
                    <Breadcrumbs separator="›" aria-label="breadcrumb">
                        {breadcrumb.map((bread) => bread)}
                    </Breadcrumbs>
                </Grid>
                {!buttonName ? (
                    ''
                ) : (
                    <Grid item md={3}>
                        <Button
                            variant="contained"
                            style={{
                                textTransform: 'none',
                                fontSize: '16px',
                                backgroundColor: '#8BB925',
                            }}
                            onClick={() => {
                                navigate({ route })
                            }}
                        >
                            <AddIcon /> {buttonName}
                        </Button>
                    </Grid>
                )}
            </Grid>
        </>
    )
}
