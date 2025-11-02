"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Menu from "@/components/Menu";
import Panel from "@/components/Panel";

export default function Dashboard() {
  const router = useRouter();
  useEffect(() => {
    const token = document.cookie.match(/token=([^;]+)/);
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="flex h-screen bg-gray-50 rtl">
      <Menu />
      <div className="flex-1 flex flex-col">
        <Header />
        <Panel />
      </div>
    </div>
  );
}
