import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'

export function CheckboxUsers({ userId, label, addCheckUser, deleteCheckUser }) {
    const [checked, setChecked] = React.useState(false)

    const handleChange = (event) => {
        setChecked(event.target.checked)
        if (event.target.checked === true) {
            addCheckUser(userId, label)
        }

        if (event.target.checked === false) {
            deleteCheckUser(userId, label)
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
