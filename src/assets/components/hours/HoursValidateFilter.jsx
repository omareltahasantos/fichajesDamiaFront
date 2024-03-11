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
        value: 'Otros',
    },
    {
        id: 4,
        label: 'Todos',
        value: 'todos',
    },
]

export function HoursValidateFilter({ searchByValidate }) {
    const [keyword, setKeyword] = useState('todos')

    const handleKeyword = (keyword) => {
        setKeyword(keyword)
        let handleKeyword = keyword === 'Otros' ? '' : keyword
        searchByValidate(handleKeyword)
    }
    return (
        <>
            <TextField
                select
                fullWidth
                InputLabelProps={{
                    style: {
                        fontSize: 20,
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
