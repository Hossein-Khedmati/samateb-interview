import Link from "next/link";

export default function Menu() {
  return (
    <aside className="w-64 bg-white shadow h-full p-4">
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard/patient-management" className="hover:text-blue-500">
            مدیریت بیماران
          </Link>
        </li>
      </ul>
    </aside>
  );
}
