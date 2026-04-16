import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import { Bell, Search } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HealthDesk — Patient Care Hub",
  description: "Modern healthcare patient management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="h-full flex bg-slate-50">
        <Sidebar />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {/* Top Header */}
          <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 shadow-sm shrink-0">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search patients, appointments..."
                className="w-full pl-9 pr-4 py-2 text-sm bg-slate-100 rounded-lg border-0 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
            </div>
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500" />
              </button>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white">
                  JD
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-semibold text-slate-800 leading-none">Dr. John Doe</p>
                  <p className="text-xs text-slate-500 mt-0.5">Administrator</p>
                </div>
              </div>
            </div>
          </header>
          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
