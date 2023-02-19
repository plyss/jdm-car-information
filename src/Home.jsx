import { useContext, useEffect } from "react"
import './App.css'
import { CarContext } from "./CarProvider"
import { getNewestCars, getLatestArrivals } from "./ApiRequest"

export default function Home() {
	const { newestCars, latestArrivals, setNewestCars, setLatestArrivals } = useContext(CarContext)

	useEffect(() => {
		getNewestCars(setNewestCars)
		getLatestArrivals(setLatestArrivals)
	  }, [])

	const ImageCard = ({ car }) => (
		<div key={car.id} className="image-card-home">
			<img src={car.image} alt={`${car.make} ${car.model}`} className="image-home" />
			<p>{car.make} {car.model}</p>
		</div>
	)

	const ImageContainer = ({ cars }) => (
		<div className="image-container-home">
			{cars.map((car) => (
				<ImageCard key={car.id} car={car} />
			))}
		</div>
	)

	return <>
		<div>
			<div className="container-car">
				<h2>
					Newest Cars
				</h2>
				<ImageContainer cars={newestCars} />
			</div>
			<div className="container-car">
				<h2>
					Latest Arrivals
				</h2>
				<ImageContainer cars={latestArrivals} />
			</div>
		</div>
	</>
}
