import React from 'react'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Tooltip, IconButton, TableCell } from '@mui/material'
import { useNavigate } from 'react-router'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export function UserActions({ handleState, deleteUser, customerId, ...user }) {
    const navigate = useNavigate()

    return (
        <>
            <TableCell>
                <Tooltip title="Editar registro" arrow placement="top">
                    <IconButton>
                        <EditIcon
                            onClick={() => {
                                navigate(`/usuarios/edit/${user.id}`, { state: { customerId } })
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
                <Tooltip
                    title={user.estado === 'Alta' ? 'Dar de baja' : 'Dar de alta'}
                    arrow
                    placement="top"
                >
                    <IconButton>
                        {user.estado === 'Alta' ? (
                            <BorderColorIcon
                                onClick={() => handleState(user.id, 'Baja')}
                                style={{
                                    backgroundColor: 'red',
                                    borderRadius: 5,
                                    color: 'white',
                                    padding: 3,
                                }}
                            />
                        ) : (
                            <BorderColorIcon
                                onClick={() => handleState(user.id, 'Alta')}
                                style={{
                                    backgroundColor: '#BAD80A',
                                    borderRadius: 5,
                                    color: 'white',
                                    padding: 3,
                                }}
                            />
                        )}
                    </IconButton>
                </Tooltip>
            </TableCell>
        </>
    )
}
