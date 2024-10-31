import React from 'react'
import EditIcon from '@mui/icons-material/Edit'
import { Tooltip, IconButton, TableCell } from '@mui/material'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import { useNavigate } from 'react-router'

export function CampaignsActions({ customerId, inactiveCampaign, ...camp }) {
    const navigate = useNavigate()
    return (
        <>
            <TableCell>
                <Tooltip title="Editar registro" arrow placement="top">
                    <IconButton>
                        <EditIcon
                            onClick={() => {
                                navigate(`/campaigns/edit/${camp.id}`, { state: { customerId } })
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
                <Tooltip title="Dar de baja" arrow placement="top">
                    <IconButton>
                        <BorderColorIcon
                            onClick={() => inactiveCampaign(camp.id)}
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
