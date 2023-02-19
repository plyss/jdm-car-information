import axios from "axios"

const getData = async (url, setFunction) => {
    try {
        const res = await axios.get(url)
        setFunction(res.data)
    } catch (error) {
        console.log(error)
    }
}

export const getAllCars = (setCars) => {
    getData('https://my-json-server.typicode.com/plyss/jdmmockjson/cars', setCars)
}

export const getNewestCars = (setNewestCars) => {
    getData('https://my-json-server.typicode.com/plyss/jdmmockjson/cars?_sort=year&_order=desc', setNewestCars)
}

export const getLatestArrivals = (setLatestArrivals) => {
    getData('https://my-json-server.typicode.com/plyss/jdmmockjson/cars?_sort=id&_order=desc', setLatestArrivals)
}

export const getCarById = async (carId) => {
    try {
        const res = await axios.get(`https://my-json-server.typicode.com/plyss/jdmmockjson/cars/${carId}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
