import React, { Fragment, useEffect, useState } from 'react'
import { AppBarComponent } from '../../appbar/AppBarComponent'
import { useNavigate } from 'react-router'

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
    }

    return (
        <Fragment>
            <AppBarComponent />
        </Fragment>
    )
}
