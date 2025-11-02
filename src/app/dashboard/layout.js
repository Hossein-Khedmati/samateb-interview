"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  
  useEffect(() => {
    const token = document.cookie.match(/token=([^;]+)/);
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Menu />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}