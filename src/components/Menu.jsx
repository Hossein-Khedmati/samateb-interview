import Link from "next/link";

export default function Menu() {
  return (
    <aside className="w-64 bg-white shadow h-full p-4">
      <h1 className="text-3xl mb-5 px-3">منو</h1>
      <ul className="space-y-4">
        <Link href="/dashboard/patient-management">
          <li className="hover:bg-blue-500 duration-300 p-3 rounded-2xl hover:text-white">
            مدیریت بیماران
          </li>
        </Link>
      </ul>
    </aside>
  );
}
