import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import './App.css'
import { CarContext } from "./CarProvider"
import { getCarById } from "./ApiRequest"

export default function CarDetails() {
    const { carId } = useParams()
    const { carDetail, setCarDetail } = useContext(CarContext)

    useEffect(() => {
        getCarById(carId)
            .then(res => setCarDetail(res))
            .catch(error => console.error(error));
    }, [carId])

    return <>
        <div className="car-detail-container">
            <h1>{carDetail.make} {carDetail.model}</h1>
            <div className="parent-car-info">
                <div className="first-car-info">
                    <img src={carDetail.image} alt={`${carDetail.make} ${carDetail.model}`} className="car-detail-image" />
                </div>
                <div className="second-car-info">
                    <p>Tahun: {carDetail.year}</p>
                    <p>Jarak: {carDetail.mileage} km</p>
                    <p>Transmisi: {carDetail.transmission}</p>
                    <p>Penggerak: {carDetail.drivetrain}</p>
                </div>
            </div>
        </div>
    </>
}
