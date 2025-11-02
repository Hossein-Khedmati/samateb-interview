"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Menu() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "داشبورد اصلی" },
    { href: "/dashboard/patient-management", label: "مدیریت بیماران" },
  ];

  const isActive = (href) => {
    return pathname === href;
  };

  return (
    <aside className="w-64 bg-white shadow h-full p-4">
      <h1 className="text-3xl mb-5 px-3">منو</h1>
      <ul className="flex flex-col gap-2">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`duration-300 p-3 rounded-2xl block ${
                isActive(item.href)
                  ? "bg-[#1976d2] text-white"
                  : "hover:bg-[#1976d2] hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}