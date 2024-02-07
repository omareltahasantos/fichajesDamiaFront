import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Pagination } from '@mui/material'

export function PaginationItems({ count, setMethod, endpoint }) {
    const [page, setPage] = useState(1)
    const [limitItems, setLimitItems] = useState(30)
    const [offsetItems, setOffsetItems] = useState(0)

    useEffect(() => {
        handlePagination(page)
    }, [page])

    useEffect(() => {
        fetchPaginate()
    }, [offsetItems])

    const handlePage = (event, value) => {
        setPage(value)
    }

    const handlePagination = (page) => {
        setOffsetItems(page * limitItems - limitItems)
    }

    const fetchPaginate = async () => {
        try {
            let { data } = await axios.get(endpoint, {
                params: {
                    limit: limitItems,
                    offset: offsetItems,
                },
            })
            setMethod(data)
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <>
            <Pagination
                count={Math.ceil(count / limitItems)}
                page={page}
                onChange={handlePage}
                variant="outlined"
                color="primary"
            />
        </>
    )
}
