import React, { useState } from 'react'
import { TableCell, Button } from '@mui/material'
import { orderBy } from 'lodash'

const invertDirect = {
    asc: 'desc',
    desc: 'asc',
}

export function SortColumn({ column, label, setMethod, state }) {
    const [columnToSort, setColumnToSort] = useState('')
    const [sortDirection, setSortDirection] = useState('desc')

    const handleSort = (columnName) => {
        setColumnToSort(columnName)

        if (columnToSort === columnName) {
            setSortDirection(invertDirect[sortDirection])
            setMethod(orderBy(state, columnToSort, sortDirection))
        } else {
            setSortDirection(invertDirect[sortDirection])
            setMethod(orderBy(state, columnName, sortDirection))
        }
    }
    return (
        <>
            <TableCell onClick={() => handleSort(column)} sx={{ cursor: 'pointer' }}>
                <Button
                    variant="text"
                    sx={{ mt: 0, mb: 0 }}
                    style={{
                        textTransform: 'none',
                        color: 'black',
                        fontWeight: 'bold',
                        fontSize: '0.75rem',
                    }}
                >
                    {columnToSort === column
                        ? sortDirection === 'desc'
                            ? `${label} ↓`
                            : `${label} ↑`
                        : `${label} ↓`}
                </Button>
            </TableCell>
        </>
    )
}
