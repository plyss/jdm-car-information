import { useState, useEffect, useContext } from "react"
import axios from "axios"
import './App.css'
import { CarContext } from "./CarProvider"
import { SearchContext } from "./SearchProvider"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { setLogout } from "./adminSlice"
import { getAllCars } from "./ApiRequest"

function MyCar() {
    const defaultInput = {
        make: '',
        model: '',
        year: '',
        mileage: '',
        transmission: '',
        drivetrain: '',
        image: ''
    }

    const { cars, setCars } = useContext(CarContext)
    const [formInput, setFormInput] = useState({ ...defaultInput })
    const [isEdited, setIsEdited] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const { search, setSearch } = useContext(SearchContext)

    const dispatch = useDispatch()
    const admin = useSelector((state) => state.admin)
    const navigate = useNavigate()

    const handleSearch = (e) => {
        setSearch(e.target.value)
    }

    const handleFormInput = (type, value) => setFormInput({ ...formInput, [type]: value })

    const handleSubmit = async (evt) => {
        evt.preventDefault()

        const isEdit = !!formInput.id

        if (isEdit) await axios.put('https://my-json-server.typicode.com/plyss/jdmmockjson/cars' + formInput.id, formInput)
        else await axios.post('https://my-json-server.typicode.com/plyss/jdmmockjson/cars', formInput)

        setFormInput({ ...defaultInput })
        getAllCars(setCars)
        setIsSubmitted(true)
        setIsEdited(false)
    }

    const deleteCar = async id => {
        await axios.delete('https://my-json-server.typicode.com/plyss/jdmmockjson/cars' + id)
        getAllCars(setCars)
    }

    const prepareEdit = async id => {
        const res = await axios.get('https://my-json-server.typicode.com/plyss/jdmmockjson/cars' + id)
        setFormInput(res.data)
        setIsEdited(true)
        setIsSubmitted(false)
        navigate('/admin')
    }

    const carRow = (car) => (
        <tr key={car.id}>
            <td className="my-car-td">{car.id}</td>
            <td className="my-car-td">{car.make}</td>
            <td className="my-car-td">{car.model}</td>
            <td className="my-car-td">{car.year}</td>
            <td className="my-car-td">{car.mileage} km</td>
            <td className="my-car-td">{car.transmission}</td>
            <td className="my-car-td">{car.drivetrain}</td>
            <td className="my-car-td">
                <button onClick={() => deleteCar(car.id)} disabled={isEdited && !isSubmitted}>
                    Hapus
                </button>
                <button onClick={() => prepareEdit(car.id)}>
                    Edit
                </button>
            </td>
        </tr>
    )

    const handleCars = (cars, search) => {
        return cars.filter((car) => car.make.toLowerCase().includes(search.toLowerCase()) || car.model.toLowerCase().includes(search.toLowerCase()))
            .map(carRow);
    }

    const handleLogout = async () => {
        dispatch(setLogout())
        localStorage.clear()
        setFormInput({ ...defaultInput })
        navigate('/admin')
    }

    useEffect(() => {
        getAllCars(setCars)
    }, [])

    return <>
        {console.log(admin)}
        <button onClick={handleLogout}>
            Log Out
        </button>
        <h1 className="my-car-title">Welcome to Faisal JDM Garage, {admin.username}</h1>
        <form className="my-car-form" onSubmit={handleSubmit}>
            <label>
                Merk:
                <input className="my-car-input" type="text" value={formInput.make} onChange={(evt) => handleFormInput('make', evt.target.value)} placeholder="Merk" required /> <br />
            </label>
            <br />
            <label>
                Model:
                <input className="my-car-input" type="text" value={formInput.model} onChange={(evt) => handleFormInput('model', evt.target.value)} placeholder="Model" required /> <br />
            </label>
            <br />
            <label>
                Tahun:
                <input className="my-car-input" type="text" value={formInput.year} onChange={(evt) => handleFormInput('year', evt.target.value)} placeholder="Tahun" required /> <br />
            </label>
            <br />
            <label>
                Jarak (km):
                <input className="my-car-input" type="text" value={formInput.mileage} onChange={(evt) => handleFormInput('mileage', evt.target.value)} placeholder="Jarak" required /> <br />
            </label>
            <br />
            <p className="my-car-p">Transmisi:</p>
            <label>
                <input className="my-car-input" type="radio" value="Automatic" checked={formInput.transmission === "Automatic"} onChange={(evt) => handleFormInput("transmission", evt.target.value)} required />
                Automatic
            </label>
            <label>
                <input className="my-car-input" type="radio" value="Manual" checked={formInput.transmission === "Manual"} onChange={(evt) => handleFormInput("transmission", evt.target.value)} required />
                Manual
            </label>
            <br />
            <label>
                Penggerak:
                <select value={formInput.drivetrain} onChange={(evt) => handleFormInput("drivetrain", evt.target.value)} required >
                    <option value=""></option>
                    <option value="FWD">FWD</option>
                    <option value="RWD">RWD</option>
                    <option value="AWD">AWD</option>
                </select>
            </label>
            <br />
            <label>
                Gambar:
                <input className="my-car-input" type="text" value={formInput.image} onChange={(evt) => handleFormInput('image', evt.target.value)} placeholder="Url Gambar" required /> <br />
            </label>
            <br />
            <button type="submit" >Simpan</button>
        </form>
        <hr />
        <div className="my-car-div">
            <input className="my-car-search"
                type="text"
                placeholder="Cari berdasarkan merk / model"
                value={search}
                onChange={handleSearch}
            />
            <br />
            <table className="my-car-table">
                <thead>
                    <tr>
                        <th className="my-car-th">ID</th>
                        <th className="my-car-th">Merk</th>
                        <th className="my-car-th">Model</th>
                        <th className="my-car-th">Tahun</th>
                        <th className="my-car-th">Jarak</th>
                        <th className="my-car-th">Transmisi</th>
                        <th className="my-car-th">Penggerak</th>
                        <th className="my-car-th">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {handleSearch ? handleCars(cars, search) : cars.map(carRow)}
                </tbody>
            </table>
        </div>
    </>
}

export default MyCar