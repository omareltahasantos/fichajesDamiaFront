import React, { Fragment, useEffect } from 'react'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { DashbordBody } from '../../DashbordBody'
import { useNavigate } from 'react-router'
import { Footer } from '../../Footer'

export function Dashboard() {
    const user = JSON.parse(sessionStorage.getItem('user'))
    const navigate = useNavigate()
    useEffect(() => {
        checkUser()
    }, [])

    const checkUser = () => {
        if (user === null) {
            navigate('/login')
            return
        }

        if (user.rol === 'TECNICO') {
            navigate('/homeTecnicos')
        }
    }

    return (
        <Fragment>
            {user !== null && user.rol !== 'TECNICO' ? (
                <Fragment>
                    <DashbordBody />
                </Fragment>
            ) : null}
        </Fragment>
    )
}
