import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

// گرفتن لیست بیماران
export const fetchPatients = createAsyncThunk("patients/fetchAll", async () => {
  const res = await api.get("/Interview/Patient");
  return res.data.result;
});

// افزودن بیمار جدید
export const addPatient = createAsyncThunk(
  "patients/add",
  async (patientData) => {
    const res = await api.post("/Interview/Patient", patientData);
    return res.data.result || patientData;
  }
);

export const updatePatient = createAsyncThunk(
  "patients/update",
  async ({ id, patientData }) => {
    const res = await api.put(`/Interview/Patient/${id}`, patientData);
    // اگر API چیزی برنگرداند، از patientData استفاده می‌کنیم
    return res.data.result || { id, ...patientData };
  }
);

// حذف بیمار
export const deletePatient = createAsyncThunk("patients/delete", async (id) => {
  await api.delete(`/Interview/Patient/${id}`);
  return id; // فقط id برای حذف از state کافیست
});

const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    list: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload || [];
      })
      .addCase(fetchPatients.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        if (action.payload) {
          state.list.push(action.payload);
        }
      })
      // updatePatient
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // deletePatient
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export default patientsSlice.reducer;
