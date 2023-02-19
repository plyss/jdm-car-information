import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import MyCar from './MyCar'

const Protected = () => {
    const { token } = useSelector(state => state.admin)

    if (!token) {
        return <Navigate to="/admin" />
    } else {
        return <MyCar />
    }
}

export default Protected
