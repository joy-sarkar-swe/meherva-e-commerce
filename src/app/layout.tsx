import ToastDisplay from "@/components/ui/ToastDisplay";
import { StoreProvider } from "@/lib/store";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Meherva — Premium Ethnic Wear for Women",
  description: "Shop premium Kurtis, Dresses & Ethnic Sets at Meherva.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' data-scroll-behavior='smooth'>
      <body>
        <StoreProvider>
          {children}
          <ToastDisplay />
        </StoreProvider>
      </body>
    </html>
  );
}
