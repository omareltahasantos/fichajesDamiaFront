import { NativeSelect, Typography } from '@mui/material'
import React from 'react'
import { isMobile } from 'react-device-detect'
import Select from 'react-select'

export function DropdownApp({
    title,
    value,
    setValue,
    options,
    placeholder = '',
    optionDefault = 'Selecciona una opción',
}) {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            fontFamily: 'sans-serif',
            fontSize: isMobile ? '11.5px' : '14px',
            borderColor: state.isFocused ? '#bad80a' : '#ccc', // Color de borde en focus
            boxShadow: state.isFocused ? '0 0 0 2px rgba(186, 216, 10, 0.5)' : 'none', // Brillo en focus
            backgroundColor: 'white', // Color de fondo
            color: 'black', // Color del texto
            '&:hover': {
                borderColor: '#bad80a', // Cambia el color del borde al pasar el mouse
            },
        }),
        menu: (provided) => ({
            ...provided,
            zIndex: 9999, // Asegura que el menú no se solape con otros elementos
        }),
        singleValue: (provided) => ({
            ...provided,
            fontFamily: 'sans-serif',
            fontSize: isMobile ? '11.5px' : '14px',
        }),
        placeholder: (provided) => ({
            ...provided,
            fontFamily: 'sans-serif',
            fontSize: isMobile ? '11.5px' : '14px',
        }),
        option: (provided, state) => ({
            ...provided,
            fontFamily: 'sans-serif',
            backgroundColor: state.isSelected
                ? '#bad80a' // Color cuando la opción está seleccionada
                : state.isFocused
                ? '#e0e8aa' // Color cuando la opción está en hover
                : 'white', // Color normal de fondo
            color: state.isSelected ? 'white' : 'black', // Color del texto
            '&:hover': {
                backgroundColor: '#e0e8aa',
                color: 'black',
            },
        }),
    }
    return (
        <>
            <Typography paddingBottom="15px">{title}</Typography>
            <Select
                noOptionsMessage={() => 'No hay opciones disponibles'}
                value={value}
                onChange={(e) => setValue(e)}
                placeholder={placeholder}
                styles={{
                    ...customStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 99999 }), // 🔥 Asegura que esté por encima del modal
                }}
                options={options}
                menuPortalTarget={document.body} // 🔥 Renderiza el menú fuera del modal
            />
            {/**
             *  <NativeSelect
                variant={'filled'}
                placeholder={placeholder}
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
                <option value={''}>{optionDefault}</option>
                {options.map(({ value, label }) => (
                    <option value={value}>{label}</option>
                ))}
            </NativeSelect>
             */}
        </>
    )
}

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value)
}
