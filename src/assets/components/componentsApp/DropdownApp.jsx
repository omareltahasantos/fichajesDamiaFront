import { NativeSelect, Typography } from '@mui/material'
import React from 'react'

export function DropdownApp({ title, value, setValue, optionDefault, options }) {
    return (
        <>
            <Typography paddingBottom="15px">{title}</Typography>
            <NativeSelect
                variant={'filled'}
                required
                fullWidth
                inputProps={{
                    name: 'age',
                    id: 'uncontrolled-native',
                }}
                value={value}
                onChange={(e) => {
                    setValue(isNumeric(e.target.value) ? Number(e.target.value) : e.target.value)
                }}
            >
                <option>{optionDefault}</option>
                {options.map(({ value, label }) => (
                    <option value={value}>{label}</option>
                ))}
            </NativeSelect>
        </>
    )
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
}
