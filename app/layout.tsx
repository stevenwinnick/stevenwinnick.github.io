import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Steven Winnick's Website",
  description:
    "The personal website of Steven Winnick, a software engineer in New York City",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {/* Offset content below the fixed navbar. */}
        <div className="pt-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
