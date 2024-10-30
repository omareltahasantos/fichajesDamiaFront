import { Footer } from '../Footer'
import { AppBarComponent } from './AppBarComponent'

const AppContainer = ({ children }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <AppBarComponent />
            <div style={{ flex: 1 }}>{children}</div>
            <Footer />
        </div>
    )
}

export default AppContainer
