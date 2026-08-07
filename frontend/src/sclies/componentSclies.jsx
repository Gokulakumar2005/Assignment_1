import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axiosInstance";

export const CreateComponent = createAsyncThunk("/compo/CreateComponent", async (formData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/create/component", formData, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        console.log(response.data);
        return response.data;
    } catch (err) {
        let msg = err.response?.data?.error || err.message || "Something went wrong";
        console.log(msg);
        return rejectWithValue(msg);
    }
});

export const FetchComponents = createAsyncThunk("/compo/FetchComponents", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/components", {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return response.data;
    } catch (err) {
        let msg = err.response?.data?.error || err.message || "Something went wrong";
        return rejectWithValue(msg);
    }
});

export const UpdateComponentPrice = createAsyncThunk("/compo/UpdateComponentPrice", async ({ id, currentPrice }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`/components/${id}`, { currentPrice }, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return response.data;
    } catch (err) {
        let msg = err.response?.data?.error || err.message || "Something went wrong";
        return rejectWithValue(msg);
    }
});

export const DeleteComponent = createAsyncThunk("/compo/DeleteComponent", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.delete(`/components/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token"),
            },
        });
        return { id, message: response.data.message };
    } catch (err) {
        let msg = err.response?.data?.error || err.message || "Something went wrong";
        return rejectWithValue(msg);
    }
});

const Component = createSlice({
    name: "compo",
    initialState: {
        componentData: [],
        loading: false,
        Error: null
    },
    extraReducers: (builder) => {
        builder.addCase(CreateComponent.pending, (state) => {
            state.Error = null;
            state.loading = true;
        });
        builder.addCase(CreateComponent.fulfilled, (state, action) => {
            state.componentData = Array.isArray(state.componentData) ? [...state.componentData, action.payload] : [action.payload];
            state.loading = false;
        });
        builder.addCase(CreateComponent.rejected, (state, action) => {
            state.Error = action.payload;
            state.loading = false;
        });
        builder.addCase(FetchComponents.pending, (state) => {
            state.Error = null;
            state.loading = true;
        });
        builder.addCase(FetchComponents.fulfilled, (state, action) => {
            state.componentData = action.payload;
            state.loading = false;
        });
        builder.addCase(FetchComponents.rejected, (state, action) => {
            state.Error = action.payload;
            state.loading = false;
        });

        // Update
        builder.addCase(UpdateComponentPrice.fulfilled, (state, action) => {
            state.componentData = state.componentData.map(c => c._id === action.payload._id ? action.payload : c);
            state.loading = false;
        });
        builder.addCase(UpdateComponentPrice.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(UpdateComponentPrice.rejected, (state, action) => {
            state.Error = action.payload;
            state.loading = false;
        });

        // Delete
        builder.addCase(DeleteComponent.fulfilled, (state, action) => {
            state.componentData = state.componentData.filter(c => c._id !== action.payload.id);
            state.loading = false;
        });
        builder.addCase(DeleteComponent.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(DeleteComponent.rejected, (state, action) => {
            state.Error = action.payload;
            state.loading = false;
        });
    }
});

export default Component.reducer;