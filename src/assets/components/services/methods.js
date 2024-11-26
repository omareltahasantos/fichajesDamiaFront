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

export function parseRol(rol) {
    switch (rol) {
        case 'ADMIN':
            return 'JP'
        case 'COORDINADOR':
            return 'COORDINADOR'
        case 'TECNICO':
            return 'USUARIO'
        default:
            return 'CONTROL'
    }
}

export function parseDate(dateInput) {
    // Asegurarse de que la entrada es un objeto Date válido
    const date = new Date(dateInput)

    // Verificar si la fecha es válida
    if (isNaN(date)) {
        throw new Error('Fecha inválida')
    }

    // Obtener día, mes y año
    const day = String(date.getDate()).padStart(2, '0') // DD
    const month = String(date.getMonth() + 1).padStart(2, '0') // MM (los meses en JS comienzan desde 0)
    const year = date.getFullYear() // AAAA

    // Obtener la hora, minutos y segundos si existen
    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    // Si la fecha tiene hora, añadirla al final
    const formattedDate = `${day}-${month}-${year}`
    const formattedTime = `${hours}:${minutes}:${seconds}`

    // Si tiene tiempo, devolver la fecha con la hora, si no, solo la fecha
    return formattedTime === '01:00:00' || formattedTime === '02:00:00'
        ? formattedDate
        : `${formattedDate} ${formattedTime}`
}

export function orderCustomers(customers) {
    let sm = customers.find((customer) => customer.label === 'sm')
    let rest = customers.filter((customer) => customer.label !== 'sm')

    rest.sort((a, b) => {
        if (a.label < b.label) {
            return -1
        }
        if (a.label > b.label) {
            return 1
        }
        return 0
    })

    return [sm, ...rest]
}
