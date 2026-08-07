import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../config/axiosInstance";

export const CreateQuotation = createAsyncThunk("/quotation/CreateQuotation", async (quotationData, { rejectWithValue }) => {
    try {
        const response = await axios.post("/quotations", quotationData, {
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

export const FetchQuotations = createAsyncThunk("/quotation/FetchQuotations", async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get("/admin/quotations", {
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

const QuotationSlice = createSlice({
    name: "quotation",
    initialState: {
        quotations: [],
        loading: false,
        Error: null
    },
    extraReducers: (builder) => {
        builder.addCase(CreateQuotation.pending, (state) => {
            state.Error = null;
            state.loading = true;
        });
        builder.addCase(CreateQuotation.fulfilled, (state, action) => {
            state.quotations = [action.payload, ...state.quotations];
            state.loading = false;
        });
        builder.addCase(CreateQuotation.rejected, (state, action) => {
            state.Error = action.payload;
            state.loading = false;
        });

        builder.addCase(FetchQuotations.pending, (state) => {
            state.Error = null;
            state.loading = true;
        });
        builder.addCase(FetchQuotations.fulfilled, (state, action) => {
            state.quotations = action.payload;
            state.loading = false;
        });
        builder.addCase(FetchQuotations.rejected, (state, action) => {
            state.Error = action.payload;
            state.loading = false;
        });
    }
});

export default QuotationSlice.reducer;
