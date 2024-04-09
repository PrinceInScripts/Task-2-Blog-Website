import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import axiosInstance from '../../config/axiosInstance'
import toast from 'react-hot-toast'

const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    data: JSON.parse(localStorage.getItem("data")) || {},
    role:localStorage.getItem("role") || "",
}






const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    
})

export default authSlice.reducer;
