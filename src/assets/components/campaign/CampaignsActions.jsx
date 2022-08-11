import React from 'react'
import EqualizerIcon from '@mui/icons-material/Equalizer'
import EditIcon from '@mui/icons-material/Edit'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Tooltip, IconButton, TableCell } from '@mui/material'
import { useNavigate } from 'react-router'

export function CampaignsActions({ deleteCampaign, ...camp }) {
    const navigate = useNavigate()
    return (
        <>
            <TableCell>
                {/*
                <Tooltip title="Estadísticas" arrow placement="top">
                    <IconButton>
                        <EqualizerIcon
                            style={{
                                backgroundColor: '#805ad5',
                                borderRadius: 5,
                                color: 'white',
                                padding: 3,
                            }}
                        />
                    </IconButton>
                </Tooltip>
                */}
                <Tooltip title="Editar registro" arrow placement="top">
                    <IconButton>
                        <EditIcon
                            onClick={() => {
                                navigate(`/campaigns/edit/${camp.id}`)
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
                <Tooltip title="Eliminar registro" arrow placement="top">
                    <IconButton>
                        <DeleteForeverIcon
                            onClick={() => deleteCampaign(camp.id)}
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
        </>
    )
}
