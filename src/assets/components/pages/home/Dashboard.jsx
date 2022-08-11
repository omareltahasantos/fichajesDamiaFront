import React, { Fragment, useEffect } from 'react'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { DashbordBody } from '../../DashbordBody'
import { useNavigate } from 'react-router'
import { Footer } from '../../Footer'

export function Dashboard() {
    const navigate = useNavigate()
    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = () => {
        const user = JSON.parse(sessionStorage.getItem('user'))

        if (!user) {
            navigate('/login')
        }

        if (user.rol === 'TECNICO') {
            navigate('/homeTecnicos') // Dashboard para rol tecnicos
        }
    }

    return (
        <Fragment>
            <AppBarComponent />
            <DashbordBody />
            <Footer />
        </Fragment>
    )
}
