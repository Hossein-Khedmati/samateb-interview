import { configureStore } from '@reduxjs/toolkit';
import patientReducer from './slices/patientSlice';

export const store = configureStore({
  reducer: { patient: patientReducer },
});
