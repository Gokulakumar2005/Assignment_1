import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axiosInstance";
import { toast } from "react-toastify";

export const RegisterUser = createAsyncThunk('auth/RegisterUser', async ({ formData, redirect }, { rejectWithValue }) => {
    try {
        console.log({ "formData": formData })
        const response = await axios.post('/user/register', formData);
        console.log(response.data)
        redirect();
        toast.success("successfully registered");
        return response.data;
    } catch (err) {
        let errorData = err.response?.data?.error;
        const msg = Array.isArray(errorData) ? errorData[0] : (errorData || err.message || "Something went wrong");
        console.log(msg);
        return rejectWithValue(msg);
    }
})

export const LoginUser = createAsyncThunk("auth/LoginUser", async ({ formData, redirect, loginRedirect }, { rejectWithValue }) => {
    try {
        const response = await axios.post("/user/login", formData);
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        const userResponse = await axios.get("/user/account", { headers: { Authorization: localStorage.getItem("token") } });
        redirect();
       toast.success("successfully logged in"); 
        return userResponse.data;

    } catch (err) {
      let errorData = err.response?.data?.error;
      const msg = Array.isArray(errorData) ? errorData[0] : (errorData || err.message || "Something went wrong");
      if (loginRedirect) {
        loginRedirect();
      }

      return rejectWithValue(msg);
    }

})

export const UserAccount = createAsyncThunk("auth/UserAccount", async (_, { rejectWithValue }) => {

    try {
        const response = await axios.get("/user/account", { headers: { Authorization: localStorage.getItem("token") } });
        return response.data;
    } catch (error) {
        let errorData = error.response?.data?.error;
        const msg = Array.isArray(errorData) ? errorData[0] : (errorData || error.message || "Something went wrong");
        console.log(msg);
        return rejectWithValue(msg);
    }
})


const authSlices = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isLoggedIn: false,
        loading:false,
        Error: null,
    },

    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.isLoggedIn = false;
            localStorage.removeItem("token");

        }
    },

    extraReducers: (builder) => {

        builder.addCase(RegisterUser.pending, (state) => {
            state.Error = null;
            state.loading=  true;
        })
        builder.addCase(RegisterUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading=false;

        })
        builder.addCase(RegisterUser.rejected, (state, action) => {
            state.Error = action.payload;
            state.loading=false;
        })

        builder.addCase(LoginUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;    
            state.loading=false;
            state.Error = null;

        })
        builder.addCase(LoginUser.pending, (state) => {
            state.Error = null;
            state.loading=true;
        })

        builder.addCase(LoginUser.rejected, (state, action) => {
            state.Error = action.payload;
            state.isLoggedIn = false;
            state.loading=false;
        })

        

        builder.addCase(UserAccount.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
            state.loading   =false;
            state.Error = null;

        })
        builder.addCase(UserAccount.pending, (state) => {
            state.Error = null;
            state.loading=true;
        })
        builder.addCase(UserAccount.rejected, (state, action) => {
            state.Error = action.payload;
            state.isLoggedIn = false;
            state.loading=false;
        })
        


    }


})

export const { logoutUser } = authSlices.actions;
export default authSlices.reducer;