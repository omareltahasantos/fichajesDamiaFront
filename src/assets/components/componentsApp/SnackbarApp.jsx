import * as React from 'react'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function SnackbarApp({
    properties,
    handleClose,
    vertical = 'top',
    horizontal = 'center',
    time = 3000,
    style = {},
}) {
    const { open, text, color } = properties

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar
                open={open}
                autoHideDuration={time}
                onClose={handleClose}
                anchorOrigin={{ vertical, horizontal }}
                key={vertical + horizontal}
                sx={style}
            >
                <Alert onClose={handleClose} severity={color} sx={{ width: '100%' }}>
                    {text}
                </Alert>
            </Snackbar>
        </Stack>
    )
}
