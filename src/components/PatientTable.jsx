import { useState, useMemo } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
  TextField,
  Box,
} from "@mui/material";

export default function PatientTable({ patients, onEdit, onDelete, onToggle }) {
  const [searchTerm, setSearchTerm] = useState("");

  // 🔍 Filter patients based on search term
  const filteredPatients = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return patients.filter(
      (p) =>
        p.name?.toLowerCase().includes(term) ||
        p.email?.toLowerCase().includes(term) ||
        p.id?.toLowerCase().includes(term)
    );
  }, [patients, searchTerm]);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 ,fontFamily: "vazir,sans-serif" }}>
      {/* 🔍 Search bar */}
      <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
        <TextField
          size="small"
          variant="outlined"
          label="جستجو بیمار"
          placeholder="جستجو بر اساس نام، ایمیل یا آیدی"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: 300, fontFamily: "vazir,sans-serif" }}
        />
      </Box>

      {/* 🧾 Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="center">#</TableCell>
            <TableCell align="center">آیدی</TableCell>
            <TableCell align="center">نام</TableCell>
            <TableCell align="center">تاریخ تولد</TableCell>
            <TableCell align="center">ایمیل</TableCell>
            <TableCell align="center">وضعیت</TableCell>
            <TableCell align="center">عملیات</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredPatients.length > 0 ? (
            filteredPatients.map((p, i) => (
              <TableRow key={p.id || i}>
                <TableCell align="center">{i + 1}</TableCell>
                <TableCell align="center" sx={{fontSize:"10px"}}>{p.id}</TableCell>
                <TableCell align="center">{p.name}</TableCell>
                <TableCell align="center">{p.dateOfBirth}</TableCell>
                <TableCell align="center">{p.email}</TableCell>
                <TableCell align="center">
                  {p.isActive ? (
                    <span className="text-green-600 font-bold">فعال</span>
                  ) : (
                    <span className="text-red-500 font-bold">غیرفعال</span>
                  )}
                </TableCell>
                <TableCell align="center">
                  <div className="flex gap-2 justify-center">
                    <Button
                      size="small"
                      variant="outlined"
                      color="info"
                      sx={{ fontFamily: "vazir,sans-serif" }}
                      onClick={() => onEdit(p)}
                    >
                      ویرایش
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="warning"
                      sx={{ fontFamily: "vazir,sans-serif" }}
                      onClick={() => onToggle(p.id)}
                    >
                      تغییر وضعیت
                    </Button>
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      sx={{ fontFamily: "vazir,sans-serif" }}
                      onClick={() => onDelete(p.id)}
                    >
                      حذف
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} align="center">
                هیچ بیماری یافت نشد
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Paper>
  );
}
