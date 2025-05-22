import { Alert, Grid, Typography } from '@mui/material'
import React from 'react'
import { AlertApp } from '../../componentsApp/AlertApp'

export function TableLinkedProjects({ customers }) {
    return (
        <Grid container spacing={0}>
            <Grid item md={12} xs={12} paddingBottom={2} paddingTop={1}>
                <Alert severity="info">
                    <Typography variant="body1">
                        El proyecto SM no es acumulativo con otros proyectos
                    </Typography>
                </Alert>
            </Grid>
            {customers.length === 0 ? (
                <Grid item md={12} xs={12}>
                    <AlertApp
                        severity={'warning'}
                        title={'Atención:'}
                        message={
                            'No hay proyectos creados, debes contactar con informática para añadir proyectos.'
                        }
                    />
                </Grid>
            ) : (
                customers.map((customer) => <Grid item md={3} xs={6}></Grid>)
            )}
        </Grid>
    )
}
