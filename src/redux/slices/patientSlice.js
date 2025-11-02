import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/lib/axios';

// Thunks
export const fetchPatients = createAsyncThunk('patient/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const res = await api.get('/patient');
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const createPatient = createAsyncThunk('patient/create', async (payload, { rejectWithValue }) => {
  try {
    const res = await api.post('/patient', payload);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const updatePatient = createAsyncThunk('patient/update', async ({ id, data }, { rejectWithValue }) => {
  try {
    const res = await api.put(`/patient/${id}`, data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

export const deletePatient = createAsyncThunk('patient/delete', async (id, { rejectWithValue }) => {
  try {
    await api.delete(`/patient/${id}`);
    return id;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

const patientSlice = createSlice({
  name: 'patient',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(fetchPatients.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; })
      .addCase(fetchPatients.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      .addCase(createPatient.fulfilled, (state, action) => { state.list.unshift(action.payload); })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.list = state.list.map(p => (p.id === action.payload.id ? action.payload : p));
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.list = state.list.filter(p => p.id !== action.payload);
      });
  },
});

export default patientSlice.reducer;
