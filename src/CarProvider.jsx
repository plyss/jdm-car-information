import { createContext, useState } from 'react'

export const CarContext = createContext()

export default function CarProvider({ children }) {
    const [cars, setCars] = useState([])
    const [newestCars, setNewestCars] = useState([])
    const [latestArrivals, setLatestArrivals] = useState([])
    const [carDetail, setCarDetail] = useState([])

    const shareValue = {
        cars,
        setCars,
        newestCars,
        setNewestCars,
        latestArrivals,
        setLatestArrivals,
        carDetail,
        setCarDetail
    }

    return <CarContext.Provider value={shareValue}>
        {children}
    </CarContext.Provider>
}
