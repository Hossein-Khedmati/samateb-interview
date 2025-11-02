"use client";

import { Button, TextField, Typography, Box } from "@mui/material";

export default function PatientForm({ 
  editingPatient, 
  form, 
  onFormChange, 
  onFormSubmit, 
  onClose 
}) {
  return (
    <Box
      component="form"
      onSubmit={onFormSubmit}
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        borderRadius: 2,
        fontFamily: "vazir"
      }}
    >
      <Typography variant="h6" mb={2} sx={{ fontFamily: "vazir,sans-serif" }}>
        {editingPatient ? "ویرایش بیمار" : "افزودن بیمار جدید"}
      </Typography>

      <TextField
        fullWidth
        name="name"
        label="نام"
        value={form.name}
        onChange={onFormChange}
        sx={{ mb: 2, fontFamily: "vazir,sans-serif" }}
        required
      />
      <TextField
        fullWidth
        name="dateOfBirth"
        label="تاریخ تولد"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={form.dateOfBirth}
        onChange={onFormChange}
        sx={{ mb: 2, fontFamily: "vazir,sans-serif" }}
        required
      />
      <TextField
        fullWidth
        name="email"
        label="ایمیل"
        type="email"
        value={form.email}
        onChange={onFormChange}
        sx={{ mb: 3 }}
        required
      />

      <Button 
        type="submit" 
        fullWidth 
        variant="contained" 
        color="primary" 
        sx={{ fontFamily: "vazir,sans-serif" }}
      >
        {editingPatient ? "ویرایش" : "ثبت"}
      </Button>
    </Box>
  );
}