import { Dashboard } from './assets/components/pages/home/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './assets/components/login/Login'
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
