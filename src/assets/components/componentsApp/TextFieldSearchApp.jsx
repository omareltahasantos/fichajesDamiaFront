import React from 'react'
import { isMobile } from 'react-device-detect'
import Select from 'react-select'

export function TextFieldSearchApp({
    state,
    method,
    array,
    placeholder,
    label = '',
    required = false,
    readOnly = false,
}) {
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            fontFamily: 'sans-serif',
            fontSize: isMobile ? '11.5px' : '14px',
            borderColor: state.isFocused ? '#bad80a' : '#ccc', // Color de borde en focus
            boxShadow: state.isFocused ? '0 0 0 2px rgba(186, 216, 10, 0.5)' : 'none', // Brillo en focus
            backgroundColor: readOnly ? '#f3f4f6' : 'white', // Color de fondo
            color: readOnly ? '#babfc8' : 'black', // Color del texto
            '&:hover': {
                borderColor: '#bad80a', // Cambia el color del borde al pasar el mouse
            },
        }),
        menu: (provided) => ({
            ...provided,
            fontFamily: 'sans-serif',
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
    const isRequired =
        required && !readOnly ? (
            <>
                {label}
                <span className="text-red-500"> *</span>
            </>
        ) : (
            label
        )
    return (
        <>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-left">
                {isRequired}
            </label>
            <Select
                isSearchable={!readOnly}
                isDisabled={readOnly}
                noOptionsMessage={() => 'No hay opciones disponibles'}
                value={state}
                onChange={(e) => method(e)}
                required={required}
                placeholder={placeholder}
                styles={{
                    ...customStyles,
                    menuPortal: (base) => ({ ...base, zIndex: 99999 }), // 🔥 Asegura que esté por encima del modal
                }}
                options={array}
                menuPortalTarget={document.body} // 🔥 Renderiza el menú fuera del modal
            />
        </>
    )
}
