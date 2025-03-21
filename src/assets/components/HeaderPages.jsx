import React from 'react'
import { Grid, Typography, Breadcrumbs, Button } from '@mui/material'
import { useNavigate } from 'react-router'
import AddIcon from '@mui/icons-material/Add'
import { DropdownApp } from './componentsApp/DropdownApp'

export function HeaderPages({
    title,
    breadcrumb,
    buttonName,
    route,
    customerSelected,
    setCustomerSelected,
    customers,
}) {
    const navigate = useNavigate()
    return (
        <>
            <Grid container spacing={3} flexDirection="column" style={{ paddingBottom: '20px' }}>
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
                <Grid item md={12}>
                    <DropdownApp
                        title={'Seleccionar proyecto:'}
                        value={customerSelected}
                        setValue={setCustomerSelected}
                        optionDefault={'Buscar proyecto'}
                        options={customers}
                    />
                </Grid>
                {!buttonName || customerSelected === null ? (
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
                                navigate(route, { state: { customerId: customerSelected } })
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
