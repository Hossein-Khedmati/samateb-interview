import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

export const fetchPatients = createAsyncThunk("patients/fetchPatients", async (_, thunkAPI) => {
  try {
    const res = await api.get("/Interview/Patient");
    const data =
      Array.isArray(res.data) ? res.data :
      Array.isArray(res.data.results) ? res.data.results :
      Array.isArray(res.data.data) ? res.data.data : [];
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data || "Fetch failed");
  }
});

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default patientsSlice.reducer;
