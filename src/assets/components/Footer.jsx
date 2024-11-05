import React from 'react'
import { Divider, Grid, Typography } from '@mui/material'

export function Footer() {
    return (
        <>
            <Divider style={{ marginTop: 30, marginBottom: 20 }} />
            <Grid
                container
                spacing={0}
                display="flex"
                justifyContent="center"
                marginTop={0}
                marginBottom={0}
            >
                <Grid item md={3} xs={12}>
                    <Typography
                        variant="body1"
                        color="GrayText"
                        style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}
                    >
                        Copyright © 2022
                        <img
                            src={require('../../assets/logos/sm-logo-h.png')}
                            alt=""
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    </Typography>
                </Grid>
            </Grid>
        </>
    )
}
