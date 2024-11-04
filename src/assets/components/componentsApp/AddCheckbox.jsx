import * as React from 'react'
import Checkbox from '@mui/material/Checkbox'

export function AddCheckbox({ addMethod, deleteMethod, itemChecked }) {
    const [checked, setChecked] = React.useState(false)

    const handleChange = (event) => {
        setChecked(event.target.checked)
        if (event.target.checked === true) {
            addMethod()
        }

        if (event.target.checked === false) {
            deleteMethod()
        }
    }

    React.useEffect(() => {
        setChecked(itemChecked)
    }, [itemChecked])

    return (
        <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            name="Omar"
        />
    )
}
