import axios from 'axios'
import endpoint from '../components/services/endpoint'

export const showUserByDni = async (dni) => {
    let { data } = await axios.get(`${endpoint}user/findBy/${dni}`)

    if (data === 'No existe el usuario') {
        return false
    }

    return true
}
