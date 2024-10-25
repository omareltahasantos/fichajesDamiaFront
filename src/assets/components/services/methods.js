import axios from 'axios'
import endpoint from './endpoint'

export default function getCustomers() {
    const { id, rol } = JSON.parse(sessionStorage.getItem('user'))

    // Devuelve una promesa
    return new Promise((resolve, reject) => {
        if (rol === 'CONTROL') {
            axios
                .get(`${endpoint}fetchAllCustomers`)
                .then(({ data, status }) => {
                    if (status !== 200) {
                        reject(new Error('Error fetching customers'))
                        return
                    }

                    const customers = data.map((customer) => ({
                        label: customer.name,
                        value: Number(customer.id),
                    }))

                    resolve(customers)
                })
                .catch((error) => {
                    console.error('Error fetching customers:', error)
                    reject(error)
                })
        } else {
            axios
                .get(`${endpoint}fetchCustomersLinkedUser/${id}`)
                .then(({ data, status }) => {
                    if (status !== 200) {
                        reject(new Error('Error fetching customers'))
                        return
                    }

                    const customers = data.map((customer) => ({
                        label: customer.name,
                        value: Number(customer.id),
                    }))

                    resolve(customers)
                })
                .catch((error) => {
                    console.error('Error fetching customers:', error)
                    reject(error)
                })
        }
    })
}
