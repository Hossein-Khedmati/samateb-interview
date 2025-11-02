"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatients, addPatient, updatePatient, deletePatient } from "@/redux/patientsSlice";
import {
  Button,
  Modal,
  Typography,
} from "@mui/material";
import PatientForm from "@/components/PatientForm";
import PatientTable from "@/components/PatientTable";
import LoadingSpinner from "@/components/Loading";

export default function PatientManagement() {
  const dispatch = useDispatch();
  const { list: patients, loading } = useSelector((state) => state.patients);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
  const [formData, setFormData] = useState({ 
    name: "", 
    dateOfBirth: "", 
    email: "" 
  });

  // Fetch patients on component mount
  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  // Update form when editing patient
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
      [e.target.name]: e.target.value 
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (editingPatient) {
        await dispatch(updatePatient({ 
          id: editingPatient.id, 
          patientData: formData 
        }));
        setEditingPatient(null);
      } else {
        await dispatch(addPatient(formData));
      }
      
      resetForm();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving patient:", error);
    }
  };

  const handleEdit = (patient) => {
    setEditingPatient(patient);
  };

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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingPatient(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({ name: "", dateOfBirth: "", email: "" });
  };

  return (
    <div className="p-6">
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ fontFamily: "vazir,sans-serif" }}
      >
        مدیریت بیماران
      </Typography>

      <div className="flex justify-end mb-4">
        <Button 
          sx={{ fontFamily: "vazir,sans-serif" }} 
          variant="contained" 
          color="primary" 
          onClick={handleAddNew}
        >
          افزودن بیمار جدید
        </Button>
      </div>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <PatientTable
          patients={patients}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="patient-form-modal"
      >
        <PatientForm
          editingPatient={editingPatient}
          form={formData}
          onFormChange={handleFormChange}
          onFormSubmit={handleFormSubmit}
          onClose={handleCloseModal}
        />
      </Modal>
    </div>
  );
}