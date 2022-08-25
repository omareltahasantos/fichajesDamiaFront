import React, { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    TableContainer,
    Paper,
    Typography,
    Grid,
} from '@mui/material'
import axios from 'axios'
import { ExportData } from '../campaign/ExportData'
import { UserItems } from './UserItems'
import { UserActions } from './UserActions'
import { UserSearch } from './UserSearch'

export function UserTable({ getCountUsers, countUsers, getCountContractedHours }) {
    const endpoint = 'http://localhost:8000/api/'
    const [users, setUsers] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        let { data } = await axios.get(`${endpoint}users`)

        if (data.length === 0) {
            setUsers([])
            return
        }

        setUsers(data)
    }

    const deleteUser = async (id) => {
        await axios.delete(`${endpoint}user/${id}`)
        getUsers()
        getCountUsers()
        getCountContractedHours()
    }

    const searchUser = async (keyword) => {
        let { data } = await axios.get(`${endpoint}searchUser`, {
            params: {
                keyword: keyword,
            },
        })

        if (data.length === 0) {
            setUsers([])
            return
        }

        setUsers(data)
    }

    return (
        <>
            <Typography paddingBottom={1} color="GrayText">
                Buscar:
            </Typography>
            <Grid container spacing={0}>
                <Grid item md={11}>
                    <UserSearch countUsers={countUsers} searchUser={searchUser} />
                </Grid>
                <ExportData Export={users} />
            </Grid>

            <TableContainer component={Paper} style={{ marginTop: 40 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>CORREO ELECTRONICO</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>CONTRATADAS(H)</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>ROL</TableCell>
                            <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map((user) => (
                            <TableRow hover>
                                <UserItems {...user} />
                                <UserActions deleteUser={deleteUser} {...user} />
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
