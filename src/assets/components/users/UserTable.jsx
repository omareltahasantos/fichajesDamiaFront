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
    Box,
} from '@mui/material'
import axios from 'axios'
import endpoint from '../services/endpoint'
import { ExportData } from '../campaign/ExportData'
import { UserItems } from './UserItems'
import { UserActions } from './UserActions'
import { UserSearch } from './UserSearch'
import { PaginationItems } from '../PaginationItems'
import { parseRol } from '../services/methods'
import { CircularLoading } from '../componentsApp/CircularLoading'

export function UserTable({ getCountUsers, countUsers, getCountContractedHours, customerId }) {
    const [users, setUsers] = useState([])
    const currentUser = JSON.parse(sessionStorage.getItem('user'))
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        if (customerId === undefined) return
        getUsers(customerId)
    }, [customerId])

    useEffect(() => {
        if (currentUser?.rol === 'ADMIN') {
            // Filtrar usuarios solo si es necesario
            setUsers((prevUsers) => prevUsers.filter((user) => user.rol !== 'CONTROL'))
        }
    }, [currentUser, users]) // Dependencias: currentUser y users

    const getUsers = async (customerId) => {
        setIsLoading(true)
        let { data } = await axios.get(`${endpoint}users`, {
            params: {
                customerId: customerId,
            },
        })

        if (data.length === 0) {
            setUsers([])
            setIsLoading(false)
            return
        }

        setUsers(
            data.map((user) => ({
                ...user,
                rol: parseRol(user.rol),
            }))
        )
        setIsLoading(false)
    }

    const deleteUser = async (id) => {
        await axios.delete(`${endpoint}user/${id}`)
        getUsers(customerId)
        getCountUsers()
        getCountContractedHours()
    }

    const handleState = async (id, state) => {
        await axios.put(`${endpoint}user/state/${id}`, {
            state: state,
        })

        getUsers(customerId)
        getCountUsers()
        getCountContractedHours()
    }

    const searchUser = async (keyword) => {
        setIsLoading(true)
        let { data } = await axios.get(`${endpoint}searchUser`, {
            params: {
                keyword: keyword,
                customerId,
            },
        })

        if (data.length === 0) {
            setUsers([])
            return
        }

        setUsers(
            data.map((user) => ({
                ...user,
                rol: parseRol(user.rol),
            }))
        )
        setIsLoading(false)
    }

    return (
        <>
            <Typography paddingBottom={1} color="GrayText">
                Buscar:
            </Typography>
            <Grid container spacing={0}>
                <Grid item md={11} xs={10}>
                    <UserSearch countUsers={countUsers} searchUser={searchUser} />
                </Grid>
                <ExportData Export={users} />
            </Grid>

            {isloading ? (
                <CircularLoading />
            ) : (
                <TableContainer component={Paper} style={{ marginTop: 40 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>NOMBRE</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>DNI</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>
                                    CORREO ELECTRONICO
                                </TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>CONTRATADAS(H)</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>ROL</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Estado</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>ACCIONES</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.length > 0 &&
                                users.map((user) => (
                                    <TableRow hover>
                                        <UserItems {...user} />
                                        <UserActions
                                            customerId={customerId}
                                            handleState={handleState}
                                            deleteUser={deleteUser}
                                            {...user}
                                        />
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <Box sx={{ paddingTop: 5, justifyContent: 'center', display: 'flex' }}>
                <PaginationItems
                    count={countUsers}
                    setMethod={setUsers}
                    endpoint={`${endpoint}paginateUsers`}
                    customerId={customerId}
                    setLoading={setIsLoading}
                />
            </Box>
        </>
    )
}
