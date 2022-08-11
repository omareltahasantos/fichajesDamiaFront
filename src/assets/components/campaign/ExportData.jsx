import React from 'react'
import { Fragment, useEffect, useState } from 'react'
import GetAppIcon from '@mui/icons-material/GetApp'
import { Tooltip, Button, IconButton } from '@mui/material'
import { makeStyles } from '@mui/styles'
import ReactExport from 'react-export-excel-xlsx-fix'

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const useStyles = makeStyles({
    export_button: {
        '&:hover': { textDecoration: 'none' },
    },
})

export function ExportData({ Export }) {
    const [keys, setKeys] = useState([])

    useEffect(() => {
        if (Export.length !== 0) {
            setKeys(Object.keys(Export[0]))
        }
    }, [Export])

    return (
        <Fragment>
            <ExcelFile
                element={
                    <Tooltip title="Exportar datos" arrow placement="top">
                        <IconButton
                            variant="contained"
                            style={{
                                marginLeft: 10,
                                backgroundColor: '#8bb925',
                                color: 'white',
                                marginTop: 7,
                            }}
                        >
                            <GetAppIcon />
                        </IconButton>
                    </Tooltip>
                }
            >
                <ExcelSheet data={Export} name="exportación">
                    {keys.map((key) => (
                        <ExcelColumn label={key} value={key} />
                    ))}
                </ExcelSheet>
            </ExcelFile>
        </Fragment>
    )
}
