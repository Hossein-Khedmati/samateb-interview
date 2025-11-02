"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, addPatient, updatePatient, deletePatient } from "@/redux/patientsSlice";
import {
  Button,
  Modal,
  Box,
  TextField,
  Typography,
  CircularProgress,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";

export default function PatientManagement() {
  const dispatch = useDispatch();
  const { list: patients, loading } = useSelector((state) => state.patients);

  const [open, setOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [form, setForm] = useState({ name: "", dateOfBirth: "", email: "" });

  // گرفتن لیست بیماران
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // پر کردن فرم هنگام ویرایش
  useEffect(() => {
    if (editingPatient) {
      setForm({
        name: editingPatient.name,
        dateOfBirth: editingPatient.dateOfBirth,
        email: editingPatient.email,
      });
      setOpen(true);
    }
  }, [editingPatient]);

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingPatient) {
      // ویرایش
      await dispatch(updatePatient({ id: editingPatient.id, patientData: form }));
      setEditingPatient(null);
    } else {
      // ایجاد
      await dispatch(addPatient(form));
    }
    setOpen(false);
    setForm({ name: "", dateOfBirth: "", email: "" });
  };

  const handleDelete = async (id) => {
    if (confirm("آیا از حذف این بیمار مطمئن هستید؟")) {
      await dispatch(deletePatient(id));
    }
  };

  return (
    <div className="p-6">
      <Typography variant="h5" gutterBottom>
        مدیریت بیماران
      </Typography>

      <div className="flex justify-end mb-4">
        <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
          افزودن بیمار جدید
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <CircularProgress />
        </div>
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>نام</TableCell>
                <TableCell>تاریخ تولد</TableCell>
                <TableCell>ایمیل</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients?.length > 0 ? (
                patients.map((p, i) => (
                  <TableRow key={p.id || i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{p.name}</TableCell>
                    <TableCell>{p.dateOfBirth}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell align="center">
                      <Button
                        size="small"
                        variant="outlined"
                        color="warning"
                        sx={{ mr: 1 }}
                        onClick={() => setEditingPatient(p)}
                      >
                        ویرایش
                      </Button>
                      <Button
                        size="small"
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(p.id)}
                      >
                        حذف
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    هیچ بیماری یافت نشد
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Modal فرم ایجاد / ویرایش */}
      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
          setEditingPatient(null);
        }}
      >
        <Box
          component="form"
          onSubmit={handleFormSubmit}
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
          }}
        >
          <Typography variant="h6" mb={2}>
            {editingPatient ? "ویرایش بیمار" : "افزودن بیمار جدید"}
          </Typography>

          <TextField
            fullWidth
            name="name"
            label="نام"
            value={form.name}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="dateOfBirth"
            label="تاریخ تولد"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={form.dateOfBirth}
            onChange={handleFormChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            name="email"
            label="ایمیل"
            value={form.email}
            onChange={handleFormChange}
            sx={{ mb: 3 }}
          />

          <Button type="submit" fullWidth variant="contained" color="primary">
            {editingPatient ? "ویرایش" : "ثبت"}
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
