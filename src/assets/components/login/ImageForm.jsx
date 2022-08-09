import React from 'react'

export function ImageForm() {
    return (
        <>
            <img
                src={require('../../logos/logo-sm-login.png')}
                alt=""
                style={{ width: 130, height: 130, objectFit: 'contain' }}
            />
            <img
                src={require('../../logos/Logo-TMB.png')}
                alt=""
                style={{ width: 130, height: 130, objectFit: 'contain' }}
            />
        </>
    )
}
