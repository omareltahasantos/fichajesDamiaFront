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
import { AddUser } from './assets/components/pages/usuarios/add/AddUser'
import { EditUser } from './assets/components/pages/usuarios/edit/EditUser'
import { StatsCampaign } from './assets/components/pages/estadisticas/statsCampaign/StatsCampaign'
import { HorasTecnico } from './assets/components/pages/home/imputarHoras/HorasTecnico'
import { AddHours } from './assets/home_tecnicos/add/AddHours'
import { EditWorkHour } from './assets/home_tecnicos/edit/EditWorkHour'
import { Customer } from './assets/components/pages/clientes/Customer'
import { EditCustomer } from './assets/components/pages/clientes/edit/EditCustomer'
import { AddCustomer } from './assets/components/pages/clientes/add/AddCustomer'
import AppContainer from './assets/components/appbar/AppContainer'
import { EditHour } from './assets/components/pages/horas/Edit/EditHour'
import { UpdateHour } from './assets/components/pages/home/updateHours/UpdateHour'
function App() {
    return (
        <>
            <BrowserRouter>
                <AppContainer>
                    <Routes>
                        <Route path="/" element={<Dashboard />}></Route>
                        <Route path="/login" element={<Login />}></Route>
                        <Route path="/homeTecnicos" element={<DashboardHome />}></Route>
                        <Route path="/horas/:campaign_id" element={<HorasTecnico />}></Route>
                        <Route path="/horas/imputar/:campaign_id" element={<AddHours />}></Route>
                        <Route
                            path="/horas/edit/imputar/:campaign_id"
                            element={<EditWorkHour />}
                        ></Route>
                        <Route path="campaigns" element={<Campaigns />} />
                        <Route path="/campaigns/add" element={<AddCampaign />} />
                        <Route path="/campaigns/edit/:id" element={<EditCampaign />} />
                        <Route path="/horas" element={<Hours />}></Route>
                        <Route path="/horas/edit/:id" element={<EditHour />}></Route>
                        <Route path="/horas/edit/technician/:campaignId" element={<UpdateHour />} />
                        <Route path="/usuarios" element={<Users />}></Route>
                        <Route path="/usuarios/add" element={<AddUser />} />
                        <Route path="/usuarios/edit/:id" element={<EditUser />} />
                        <Route path="/estadisticas" element={<Stats />}></Route>
                        <Route path="/estadisticas/:id" element={<StatsCampaign />}></Route>
                        <Route path="/proyectos" element={<Customer />}></Route>
                        <Route path="/proyectos/add" element={<AddCustomer />} />
                        <Route path="/proyectos/edit/:id" element={<EditCustomer />} />
                    </Routes>
                </AppContainer>
            </BrowserRouter>
        </>
    )
}

export default App
