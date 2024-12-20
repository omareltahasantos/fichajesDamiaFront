import React, { useEffect } from 'react'
import Checkbox from '@mui/material/Checkbox'

export function EditCheckbox({
    paramsToHandlerMethod,
    addMethod,
    deleteMethod,
    check,
    important = false,
}) {
    const [checked, setChecked] = React.useState(false)

    useEffect(() => {
        setChecked(check)
    }, [check])

    const handleChange = (event) => {
        const { first, second } = paramsToHandlerMethod
        setChecked(event.target.checked)
        if (event.target.checked === true) {
            addMethod(first, second)
        }

        if (event.target.checked === false) {
            deleteMethod(first, second)
        }
    }

    return (
        <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            name="Omar"
        />
    )
}
