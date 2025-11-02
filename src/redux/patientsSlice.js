import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/lib/axios";

// 🟢 GET all patients
export const fetchPatients = createAsyncThunk("patients/fetchAll", async () => {
  const res = await api.get("/Interview/Patient");
  return res.data.result;
});

// 🟢 POST create new patient
export const addPatient = createAsyncThunk(
  "patients/add",
  async (patientData) => {
    const res = await api.post("/Interview/Patient", patientData);
    return res.data.result;
  }
);

// 🟢 PUT update patient (full update)
export const updatePatient = createAsyncThunk(
  "patients/update",
  async ({ id, patientData }) => {
    const res = await api.put(`/Interview/Patient/${id}`, patientData);
    return res.data.result || { id, ...patientData };
  }
);

// 🟢 PATCH toggle active/inactive
export const togglePatient = createAsyncThunk(
  "patients/toggle",
  async (id) => {
    const res = await api.patch(`/Interview/Patient/${id}/Toggle`);
    return res.data.result;
  }
);

// 🟢 DELETE patient
export const deletePatient = createAsyncThunk("patients/delete", async (id) => {
  await api.delete(`/Interview/Patient/${id}`);
  return id;
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
      // ─── GET all ───────────────────────────────
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

      // ─── CREATE ────────────────────────────────
      .addCase(addPatient.fulfilled, (state, action) => {
        if (action.payload) state.list.push(action.payload);
      })

      // ─── UPDATE ────────────────────────────────
      .addCase(updatePatient.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // ─── TOGGLE ────────────────────────────────
      .addCase(togglePatient.fulfilled, (state, action) => {
        const index = state.list.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.list[index] = action.payload;
      })

      // ─── DELETE ────────────────────────────────
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.list = state.list.filter((p) => p.id !== action.payload);
      });
  },
});

export default patientsSlice.reducer;
