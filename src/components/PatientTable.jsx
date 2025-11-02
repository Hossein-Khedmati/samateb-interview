"use client";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Button,
  Typography,
} from "@mui/material";

export default function PatientTable({ 
  patients, 
  onEdit, 
  onDelete 
}) {
  if (!patients?.length) {
    return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <Typography align="center" sx={{ p: 3, fontFamily: "vazir,sans-serif" }}>
          هیچ بیماری یافت نشد
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: "vazir,sans-serif" }} align="center">#</TableCell>
            <TableCell sx={{ fontFamily: "vazir,sans-serif" }} align="center">نام</TableCell>
            <TableCell sx={{ fontFamily: "vazir,sans-serif" }} align="center">تاریخ تولد</TableCell>
            <TableCell sx={{ fontFamily: "vazir,sans-serif" }} align="center">ایمیل</TableCell>
            <TableCell sx={{ fontFamily: "vazir,sans-serif" }} align="center">عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {patients.map((patient, index) => (
            <TableRow key={patient.id || index}>
              <TableCell align="center" sx={{ fontFamily: "vazir,sans-serif" }}>
                {index + 1}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "vazir,sans-serif" }}>
                {patient.name}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "vazir,sans-serif" }}>
                {patient.dateOfBirth}
              </TableCell>
              <TableCell align="center" sx={{ fontFamily: "vazir,sans-serif" }}>
                {patient.email}
              </TableCell>
              <TableCell align="center">
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  sx={{ mr: 1, fontFamily: "vazir,sans-serif" }}
                  onClick={() => onEdit(patient)}
                >
                  ویرایش
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  onClick={() => onDelete(patient.id)}
                  sx={{ mr: 1, fontFamily: "vazir,sans-serif" }}
                >
                  حذف
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}