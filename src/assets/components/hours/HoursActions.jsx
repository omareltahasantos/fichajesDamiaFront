import React from 'react'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, IconButton, TableCell } from '@mui/material'
import { useNavigate } from 'react-router'

export function HoursActions({ deleteHour, updateValidate, customerId, ...hour }) {
    const navigate = useNavigate()
    return (
        <>
            {hour.validate === null || hour.validate === '' ? (
                <TableCell style={{ display: 'flex' }}>
                    <Tooltip title="Aceptar fichaje" arrow placement="top">
                        <IconButton>
                            <CheckIcon
                                fontSize="small"
                                onClick={() => {
                                    updateValidate(hour.id, 'Si')
                                }}
                                style={{
                                    backgroundColor: '#8bb925',
                                    borderRadius: 5,
                                    color: 'white',
                                    padding: 3,
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Denegar fichaje" arrow placement="top">
                        <IconButton>
                            <CloseIcon
                                fontSize="small"
                                onClick={() => {
                                    updateValidate(hour.id, 'No')
                                }}
                                style={{
                                    backgroundColor: '#e53e3e',
                                    borderRadius: 5,
                                    color: 'white',
                                    padding: 3,
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar registro" arrow placement="top">
                        <IconButton>
                            <DeleteForeverIcon
                                fontSize="small"
                                onClick={() => deleteHour(hour.id)}
                                style={{
                                    backgroundColor: '#e53e3e',
                                    borderRadius: 5,
                                    color: 'white',
                                    padding: 3,
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            ) : (
                <TableCell>
                    <Tooltip title="Editar registro" arrow placement="top">
                        <IconButton>
                            <EditIcon
                                fontSize="small"
                                onClick={() =>
                                    navigate(`/horas/edit/${hour.id}`, {
                                        state: { customerId: customerId, hour: hour },
                                    })
                                }
                                style={{
                                    backgroundColor: '#8bb925',
                                    borderRadius: 5,
                                    color: 'white',
                                    padding: 3,
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar registro" arrow placement="top">
                        <IconButton>
                            <DeleteForeverIcon
                                fontSize="small"
                                onClick={() => deleteHour(hour.id)}
                                style={{
                                    backgroundColor: '#e53e3e',
                                    borderRadius: 5,
                                    color: 'white',
                                    padding: 3,
                                }}
                            />
                        </IconButton>
                    </Tooltip>
                </TableCell>
            )}
        </>
    )
}
