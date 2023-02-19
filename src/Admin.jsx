import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import "./App.css";
import { setLogin } from "./adminSlice";

export default function Admin() {
    const defaultInput = {
        username: "",
        password: "",
    }

    const navigate = useNavigate()

    const [formInput, setFormInput] = useState({ ...defaultInput })
    const dispatch = useDispatch()

    const handleFormInput = (type, value) =>
        setFormInput({ ...formInput, [type]: value })

    const adminLogin = async () => {
        try {
            const admin = await axios.post(
                "https://dummyjson.com/auth/login",
                formInput
            )
            dispatch(setLogin(admin.data))
            localStorage.setItem('savedAdmin', JSON.stringify(admin.data))
            setFormInput({ ...defaultInput })
            navigate("/MyCar")
        } catch (error) {
            console.log(error)
        }
    }

    const handleLogin = (evt) => {
        evt.preventDefault()
        adminLogin()
    }

    return <>
        <div className="admin-form-container">
            <form className="admin-form" onSubmit={handleLogin}>
                <label>
                    Admin:
                    <input
                        required
                        type="text"
                        value={formInput.username}
                        onChange={(e) => handleFormInput("username", e.target.value)}
                    />
                </label>
                <br />
                <label>
                    Password:
                    <input
                        required
                        type="password"
                        value={formInput.password}
                        onChange={(e) => handleFormInput("password", e.target.value)}
                    />
                </label>
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    </>
}
