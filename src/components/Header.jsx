export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">داشبورد</h1>
      <button
        onClick={() => {
          document.cookie = "token=; path=/; max-age=0"; // حذف JWT
          window.location.href = "/";
        }}
        className="text-red-500 hover:underline"
      >
        خروج
      </button>
    </header>
  );
}
