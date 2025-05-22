import React from 'react'
import {
    Grid,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
} from '@mui/material'
import { AlertApp } from '../../componentsApp/AlertApp'
import ClearIcon from '@mui/icons-material/Clear'

export function TableLinkedProjects({ customers, handleCustomers }) {
    return (
        <Grid container spacing={0}>
            {customers.length === 0 && (
                <Grid item md={12} xs={12}>
                    <AlertApp
                        severity={'warning'}
                        title={'Atención:'}
                        message={
                            'No hay proyectos vinculados a este usuario, por favor vincule uno.'
                        }
                    />
                </Grid>
            )}

            {customers.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{ maxWidth: '100%', overflowX: 'auto' }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nombre proyecto</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {customers.map((customer) => (
                                <TableRow hover={true} key={customer.id}>
                                    <TableCell component="th" scope="row">
                                        {customer.label}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip title="Desvincular proyecto">
                                            <IconButton onClick={() => handleCustomers(customer)}>
                                                <ClearIcon color="error" />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Grid>
    )
}
