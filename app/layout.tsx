import "@/app/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { Toaster } from "@/app/components/ui/toaster";

const inter = Inter({subsets: ["latin"]});


//to be implemented after nextjs tutorial
export const metadata: Metadata = {
  title: "Hippocampi",
  description: "Advanced patient and doctor management platform for neurological care"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Header />
        <main className = "min-h-screen">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
