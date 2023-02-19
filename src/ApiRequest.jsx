import axios from "axios"

export const apiUrl = "https://my-json-server.typicode.com/plyss/jdm-car-information/cars"

const getData = async (query, setData) => {
    try {
        const response = await axios.get(`${apiUrl}${query}`);
        setData(response.data)
    } catch (error) {
        console.log(error)
    }
};

export const getAllCars = (setCars) => {
    getData("", setCars)
};

export const getNewestCars = (setNewestCars) => {
    getData("?_sort=year&_order=desc", setNewestCars)
};

export const getLatestArrivals = (setLatestArrivals) => {
    getData("?_sort=id&_order=desc", setLatestArrivals)
};

export const getCarById = async (carId) => {
    try {
        const response = await axios.get(`${apiUrl}/${carId}`);
        return response.data
    } catch (error) {
        console.log(error)
    }
};
