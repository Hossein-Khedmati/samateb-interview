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
      const res = await api.get("/Interview/Auth");
      const token = res.data.result.credential;
      document.cookie = `token=${token}; path=/; max-age=${7 * 60 * 60 * 24}`;
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
      <h1 className="text-5xl mb-10">خوش آمدید!</h1>
      <Button
        variant="contained"
        onClick={handleLogin}
        disabled={loading}
        sx={{ fontFamily: "vazir,sans-serif" }}
      >
        {loading ? "در حال ورود..." : "برای ورود کلیک کنید"}
      </Button>
    </div>
  );
}
