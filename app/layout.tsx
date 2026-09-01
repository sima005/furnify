import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/ui/footer-section";
import { CartProvider } from "@/context/CartContext";
import FloatingCart from "@/components/FloatingCart";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ترنج | هنر و اصالت در خانه",
  description: "مبلمان و دکوراسیون چوبی اصیل ایرانی با طراحی ماندگار و کیفیت بالا.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={`${vazirmatn.variable} font-sans antialiased`}>
      <body className="min-h-screen flex flex-col bg-[#F7F3EC] text-[#0B2942]">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <FloatingCart />
        </CartProvider>
      </body>
    </html>
  );
}
