import React from 'react'
import Select from 'react-select'

export function TextFieldSearch({
    value,
    setValue,
    options,
    optionDefault,
    title,
    required = true,
}) {
    const isMobile = window.innerWidth < 768
    const handleChange = (e) => {
        setValue(e)
    }

    const customStyles = {
        control: (provided) => ({
            ...provided,
            fontSize: isMobile ? '11.5px' : '',
            fontFamily: 'sans-serif',
        }),
        singleValue: (provided) => ({
            ...provided,
            fontSize: isMobile ? '11.5px' : '',
            fontFamily: 'sans-serif',
        }),
        placeholder: (provided) => ({
            ...provided,
            fontSize: isMobile ? '11.5px' : '',
            fontFamily: 'sans-serif',
        }),
        option: (provided) => ({
            ...provided,
            fontSize: isMobile ? '11.5px' : '',
            fontFamily: 'sans-serif',
        }),
    }
    return (
        <>
            <Select
                defaultValue={optionDefault}
                options={[{ value: 'all', label: 'Mostrar todos' }, ...options]}
                onChange={(e) => handleChange(e)}
                required={required}
                placeholder={title}
                defaultInputValue={value?.label}
                styles={customStyles}
            />
            <p
                style={{
                    fontSize: '14px',
                    color: '#d32f2f',
                    fontWeight: 400,
                    fontFamily: 'sans-serif',
                }}
            >
                Buscador de usuarios por nombre
            </p>
        </>
    )
}
