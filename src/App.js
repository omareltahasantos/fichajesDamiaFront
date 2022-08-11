import { Dashboard } from './assets/components/pages/home/Dashboard'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Login } from './assets/components/login/Login'
import { Campaigns } from './assets/components/pages/campañas/Campaigns'
import { Hours } from './assets/components/pages/horas/Hours'
import { Users } from './assets/components/pages/usuarios/Users'
import { Stats } from './assets/components/pages/estadisticas/Stats'
import { DashboardHome } from './assets/components/pages/home/DashboardHome'
import { AddCampaign } from './assets/components/pages/campañas/add/AddCampaign'
import { EditCampaign } from './assets/components/pages/campañas/edit/EditCampaign'
function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/homeTecnicos" element={<DashboardHome />}></Route>
                    <Route path="campaigns" element={<Campaigns />} />
                    <Route path="/campaigns/add" element={<AddCampaign />} />
                    <Route path="/campaigns/edit/:id" element={<EditCampaign />} />
                    <Route path="/horas" element={<Hours />}></Route>
                    <Route path="/usuarios" element={<Users />}></Route>
                    <Route path="/estadisticas" element={<Stats />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
