"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPatients,
  addPatient,
  updatePatient,
  deletePatient,
  togglePatient,
} from "@/redux/patientsSlice";
import {
  Button,
  Modal,
  Typography,
  Box,
  ThemeProvider,
  createTheme,
  CssBaseline,
} from "@mui/material";
import PatientForm from "@/components/PatientForm";
import PatientTable from "@/components/PatientTable";
import LoadingSpinner from "@/components/Loading";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: "vazir, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: "vazir, sans-serif",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "vazir, sans-serif",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "vazir, sans-serif",
        },
      },
    },
  },
});

export default function PatientManagement() {
  const dispatch = useDispatch();
  const { list: patients, loading } = useSelector((state) => state.patients);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
  });

  // 🧩 Fetch patients on mount
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // 🧩 Prefill form when editing
  useEffect(() => {
    if (editingPatient) {
      setFormData({
        name: editingPatient.name,
        dateOfBirth: editingPatient.dateOfBirth,
        email: editingPatient.email,
      });
      setIsModalOpen(true);
    }
  }, [editingPatient]);

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPatient) {
        await dispatch(
          updatePatient({
            id: editingPatient.id,
            patientData: formData,
          })
        );
        setEditingPatient(null);
      } else {
        await dispatch(addPatient(formData));
        await dispatch(fetchPatients());
      }

      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleEdit = (patient) => setEditingPatient(patient);

  const handleDelete = async (id) => {
    if (confirm("آیا از حذف این بیمار مطمئن هستید؟")) {
      await dispatch(deletePatient(id));
    }
  };

  const handleAddNew = () => {
    setEditingPatient(null);
    setFormData({ name: "", dateOfBirth: "", email: "" });
    setIsModalOpen(true);
  };

  const handleToggle = async (id) => {
    await dispatch(togglePatient(id));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", dateOfBirth: "", email: "" });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        dir="rtl"
        sx={{
          p: 6,
          textAlign: "right",
          fontFamily: "vazir, sans-serif",
        }}
      >
        <Typography variant="h5" gutterBottom>
          مدیریت بیماران
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNew}
            sx={{ fontFamily: "vazir, sans-serif" }}
          >
            افزودن بیمار جدید
          </Button>
        </Box>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <PatientTable
            patients={patients}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggle={handleToggle}
          />
        )}

        <Modal open={isModalOpen} onClose={handleCloseModal}>
          <PatientForm
            editingPatient={editingPatient}
            form={formData}
            onFormChange={handleFormChange}
            onFormSubmit={handleFormSubmit}
            onClose={handleCloseModal}
          />
        </Modal>
      </Box>
    </ThemeProvider>
  );
}
