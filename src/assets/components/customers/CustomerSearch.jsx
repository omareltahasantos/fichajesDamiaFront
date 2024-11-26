import React, { useState } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export function CustomerSearch({ countCustomers, searchCustomers }) {
    const [keyword, setKeyword] = useState('')

    const handleKeyword = (keyword) => {
        searchCustomers(keyword)
        setKeyword(keyword)
    }
    return (
        <>
            <TextField
                fullWidth
                InputLabelProps={{
                    style: {
                        fontSize: 20,
                    },
                }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                placeholder={`${countCustomers} registros...`}
                style={{ padding: 0 }}
                value={keyword}
                onChange={(e) => {
                    handleKeyword(e.target.value)
                }}
            />
        </>
    )
}
