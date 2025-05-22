import axios from 'axios'
import endpoint from '../components/services/endpoint'

export const showCustomers = async (userId) => {
    let { data, status } = await axios.get(`${endpoint}fetchCustomersLinkedUser/${userId}`)

    if (status !== 200 || !data) {
        return []
    }

    return data
}
