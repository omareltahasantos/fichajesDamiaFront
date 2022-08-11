import React from 'react'
import { Divider, Grid, Typography } from '@mui/material'

export function Footer() {
    return (
        <>
            <Divider style={{ marginTop: 60 }} />
            <Grid
                container
                spacing={0}
                display="flex"
                justifyContent="center"
                marginTop={3}
                marginBottom={3}
            >
                <Grid item md={3}>
                    <Typography
                        variant="body1"
                        color="GrayText"
                        style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                    >
                        Copyright © 2022{'  '}
                        <img
                            src={require('../../assets/logos/Logotipo-Metro_Principal_RGB_0.png')}
                            alt=""
                            style={{ width: 60, height: 60 }}
                        />
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
