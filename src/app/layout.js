
import "./globals.css";
import { Providers } from "@/redux/Providers";

export const metadata = {
  title: "SamaRayaneh Interview",
  description: "this is a patient handeler project that provides from SamaRayane",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>
          <Providers>{children}</Providers>
      </body>
    </html>
  );
}
