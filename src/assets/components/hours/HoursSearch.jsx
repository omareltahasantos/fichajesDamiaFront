import React, { useState, useEffect } from 'react'
import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

export function HoursSearch({ countHoursInserted, searchHours, userSearch }) {
    const [keyword, setKeyword] = useState('')

    const handleKeyword = (keyword) => {
        searchHours(keyword)
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
                placeholder={`${countHoursInserted} registros...`}
                style={{ padding: 0 }}
                value={keyword}
                onChange={(e) => {
                    handleKeyword(e.target.value)
                }}
            />
        </>
    )
}
