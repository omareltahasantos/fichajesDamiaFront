import { Footer } from '../Footer'
import { AppBarComponent } from './AppBarComponent'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

const AppContainer = ({ children }) => {
    const [hiddenElements, setHiddenElements] = useState(true)
    const { pathname } = useLocation()

    useEffect(() => {
        if (pathname === '/login') {
            setHiddenElements(true)
            return
        }
        setHiddenElements(false)
    }, [pathname])

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '98vh' }}>
            {hiddenElements ? null : <AppBarComponent />}
            <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                {children}
            </div>
            {hiddenElements ? null : <Footer />}
        </div>
    )
}

export default AppContainer
