import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { useNavigate } from 'react-router'

export function AppBarComponent() {
    const navigate = useNavigate()
    const destroySession = () => {
        const user = JSON.parse(sessionStorage.getItem('user'))

        sessionStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <Box>
            <AppBar position="static" style={{ backgroundColor: 'white' }}>
                <Toolbar variant="regular">
                    <img
                        src={require('../../logos/Logotipo-Metro_Principal_RGB_0.png')}
                        style={{ width: 80, height: 60 }}
                    />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                    <Button
                        style={{
                            backgroundColor: '#e53935',
                            color: 'white',
                            textTransform: 'none',
                            borderRadius: 10,
                            paddingleft: 10,
                            paddingRight: 10,
                        }}
                        onClick={destroySession}
                    >
                        Cerrar sesión
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
