import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Adeeb Jamil | Full Stack Developer",
  description: "Full Stack Developer specializing in Next.js, Node.js, MongoDB, and modern web technologies. Building scalable, high-performance web applications.",
  keywords: ["Full Stack Developer", "Next.js", "React", "Node.js", "MongoDB", "Web Development", "Adeeb Jamil"],
  authors: [{ name: "Adeeb Jamil" }],
  openGraph: {
    title: "Adeeb Jamil | Full Stack Developer",
    description: "Full Stack Developer specializing in Next.js, Node.js, MongoDB, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans antialiased bg-[#0a0a0f] text-white`}>
        {children}
      </body>
    </html>
  );
}
