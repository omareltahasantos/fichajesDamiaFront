import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, IconButton, TableCell } from '@mui/material'
import { useNavigate } from 'react-router'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export function CustomerActions({ inactiveCustomer, ...customer }) {
    const navigate = useNavigate()

    return (
        <>
            <TableCell>
                <Tooltip title="Editar proyecto" arrow placement="top">
                    <IconButton>
                        <EditIcon
                            onClick={() => {
                                navigate(`/proyectos/edit/${customer.id}`)
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
                <Tooltip title={'Dar de baja'} arrow placement="top">
                    <IconButton onClick={() => inactiveCustomer(customer.id)}>
                        <BorderColorIcon
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
