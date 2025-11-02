"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import api from "../lib/axios";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      // GET request to get JWT
      const res = await api.get("/Interview/Auth"); // فرض می‌کنیم API JWT را می‌دهد
      const token = res.data.result.credential;

      // ذخیره JWT در کوکی بدون پکیج اضافی
      document.cookie = `token=${token}; path=/; max-age=${60 * 60 * 24}`; // 1 روز اعتبار

      // هدر Authorization برای درخواست‌های بعدی به صورت خودکار اضافه می‌شود توسط lib/axios.js

      // ریدایرکت به داشبورد
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
      alert("خطا در ورود، لطفاً دوباره تلاش کنید.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen rtl">
      <h1 className="text-3xl mb-4">خوش آمدید!</h1>
      <Button  variant="contained" onClick={handleLogin} disabled={loading}>
        {loading ? "در حال ورود..." : "ورود"}
      </Button>
    </div>
  );
}
