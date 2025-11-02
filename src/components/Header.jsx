import { Button } from "@mui/material";

export default function Header() {
  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">داشبورد</h1>
      <Button
        color="error"
        variant="outlined"
        size="large"
        sx={{ fontFamily: "vazir,sans-serif" }}
        onClick={() => {
          document.cookie = "token=; path=/; max-age=0"; // حذف JWT
          window.location.href = "/";
        }}
      >
        خروج
      </Button>
    </header>
  );
}
