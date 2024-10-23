import React from 'react'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Tooltip, IconButton, TableCell } from '@mui/material'
import { useNavigate } from 'react-router'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export function CustomerActions({ deleteCustomer, ...customer }) {
    const navigate = useNavigate()

    return (
        <>
            <TableCell>
                <Tooltip title="Editar cliente" arrow placement="top">
                    <IconButton>
                        <EditIcon
                            onClick={() => {
                                navigate(`/clientes/edit/${customer.id}`)
                            }}
                            style={{
                                backgroundColor: '#3182ce',
                                borderRadius: 5,
                                color: 'white',
                                padding: 3,
                            }}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title={'Eliminar cliente'} arrow placement="top">
                    <IconButton onClick={() => deleteCustomer(customer.id)}>
                        <DeleteForeverIcon
                            style={{
                                backgroundColor: 'red',
                                borderRadius: 5,
                                color: 'white',
                                padding: 3,
                            }}
                        />
                    </IconButton>
                </Tooltip>
            </TableCell>
        </>
    )
}
