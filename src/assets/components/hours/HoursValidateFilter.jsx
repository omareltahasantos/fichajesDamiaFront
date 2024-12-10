import { InputAdornment, MenuItem, TextField } from '@mui/material'
import React, { useState } from 'react'

const actions = [
    {
        id: 1,
        label: 'Aceptadas',
        value: 'Si',
    },
    {
        id: 2,
        label: 'Denegadas',
        value: 'No',
    },
    {
        id: 3,
        label: 'Pendientes',
        value: 'otros',
    },
    {
        id: 4,
        label: 'Todos',
        value: 'todos',
    },
]

export function HoursValidateFilter({ saveFilter }) {
    const [keyword, setKeyword] = useState('otros')

    const handleKeyword = (keyword) => {
        setKeyword(keyword)
        saveFilter(keyword === 'otros' ? '' : keyword)
    }
    return (
        <>
            <TextField
                select
                fullWidth
                InputLabelProps={{
                    style: {
                        fontSize: 15,
                    },
                }}
                variant="outlined"
                placeholder={`Selecciona horas según validación`}
                style={{ padding: 0 }}
                value={keyword}
                onChange={(e) => {
                    handleKeyword(e.target.value)
                }}
            >
                {actions.map((item) => (
                    <MenuItem key={item.label} value={item.value}>
                        {item.label}
                    </MenuItem>
                ))}
            </TextField>
        </>
    )
}
