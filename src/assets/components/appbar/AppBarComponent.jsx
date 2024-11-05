import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router'

export function AppBarComponent() {
    const navigate = useNavigate()
    const destroySession = () => {
        sessionStorage.removeItem('user')
        navigate('/login')
    }
    return (
        <Box>
            <AppBar position="static" style={{ backgroundColor: 'white' }}>
                <Toolbar variant="regular">
                    <img
                        src={require('../../logos/logo-sm-login.png')}
                        style={{ width: 60, height: 40, marginTop: 10, marginBottom: 10 }}
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
