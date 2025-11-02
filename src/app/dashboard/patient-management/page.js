"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Box
} from "@mui/material";

export default function PatientManagement() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await api.get("/Interview/Patient");
      console.log("API response:", res.data);

      // بررسی ساختار پاسخ برای جلوگیری از خطا
      const data =
        Array.isArray(res.data) ? res.data :
        Array.isArray(res.data.results) ? res.data.results :
        Array.isArray(res.data.data) ? res.data.data : [];

      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      if (error.response?.status === 401) {
        window.location.href = "/";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={4}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        مدیریت بیماران
      </Typography>

      <Box display="flex" justifyContent="end" mb={2}>
        <Button variant="contained" color="primary">
          افزودن بیمار جدید
        </Button>
      </Box>

      {patients.length === 0 ? (
        <Typography color="text.secondary">هیچ بیماری ثبت نشده است.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>نام</TableCell>
                <TableCell>کد ملی</TableCell>
                <TableCell align="center">عملیات</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((p, i) => (
                <TableRow key={p.id || i}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{p.name || "—"}</TableCell>
                  <TableCell>{p.nationalCode || "—"}</TableCell>
                  <TableCell align="center">
                    <Button size="small" variant="outlined" color="warning" sx={{ mr: 1 }}>
                      ویرایش
                    </Button>
                    <Button size="small" variant="outlined" color="error">
                      حذف
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
