import React from 'react'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { withStyles, makeStyles, createStyles } from '@mui/styles'

const TextFieldSM = withStyles({
    root: {
        '& label.Mui-focused': {
            color: '#bad80a',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#bad80a',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'black',
            },
            '&:hover fieldset': {
                borderColor: '#bad80a',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#bad80a',
            },
        },
    },
})(TextField)

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: 0,
        },
    })
)

export function TextFieldApp({
    isOneState = false,
    name = '',
    multiline = false,
    state,
    method,
    adornment = false,
    makeEmpty = '',
    label,
    type,
    required = false,
    readOnly = false,
    focused = false,
    size = 'medium',
    fullWidth = true,
    onKeyDown = '',
    variant = 'outlined',
    styleInputLabel = '',
    styleInputProps = '',
    adornmentIcon = <CloseIcon />,
}) {
    const classes = useStyles()
    return (
        <>
            <div className={classes.root}>
                <TextFieldSM
                    className={classes.margin}
                    id="custom-css-standard-input"
                    multiline={multiline}
                    type={type}
                    label={label}
                    value={state}
                    onChange={(e) =>
                        isOneState ? method(e.target.value) : method(e.target.value, name)
                    }
                    size={size}
                    fullWidth={fullWidth}
                    onKeyDown={onKeyDown}
                    focused={focused}
                    InputProps={
                        adornment === true
                            ? {
                                  endAdornment: (
                                      <InputAdornment position="end">
                                          <IconButton onClick={makeEmpty}>
                                              {adornmentIcon}
                                          </IconButton>
                                      </InputAdornment>
                                  ),
                              }
                            : null
                    }
                    InputLabelProps={{
                        style: { color: 'grey', fontSize: 12, padding: 0, ...styleInputLabel },
                    }}
                    inputProps={{
                        style: {
                            color: 'black',
                            fontSize: 12,
                            padding: 8,
                            ...styleInputProps,
                        },
                        readOnly: readOnly,
                    }}
                    required={required}
                    variant={variant}
                />
            </div>
        </>
    )
}
