import { createSlice } from "@reduxjs/toolkit"

const initialState = JSON.parse(localStorage.getItem('savedAdmin')) || {}

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setLogin: (state, action) => {
            const {
                id,
                username,
                email,
                firstName,
                lastName,
                gender,
                image,
                token,
            } = action.payload

            state.id = id
            state.username = username
            state.email = email
            state.firstName = firstName
            state.lastName = lastName
            state.gender = gender
            state.image = image
            state.token = token
        },
        setLogout: () => {
            return { ...initialState }
        }
    }
})


export const { setLogin, setLogout } = adminSlice.actions
export default adminSlice.reducer
