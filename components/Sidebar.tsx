"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Calendar,
  Pill,
  Activity,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard",    href: "/dashboard",    icon: LayoutDashboard },
  { label: "Patients",     href: "/patients",     icon: Users },
  { label: "Appointments", href: "/appointments", icon: Calendar },
  { label: "Medications",  href: "/medications",  icon: Pill },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-slate-900 text-white shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-700">
        <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-blue-600">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="text-base font-bold tracking-tight leading-none">HealthDesk</p>
          <p className="text-[11px] text-slate-400 mt-0.5">Patient Care Hub</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 px-3 py-4 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500 px-3 mb-1">Main Menu</p>
        {navItems.map(({ label, href, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150",
                active
                  ? "bg-blue-600 text-white shadow-md shadow-blue-900/40"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              )}
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              {label}
              {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/70" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 text-xs font-bold text-white">
            JD
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Dr. John Doe</p>
            <p className="text-xs text-slate-400 truncate">Admin</p>
          </div>
          <Activity className="w-4 h-4 text-green-400 ml-auto shrink-0 animate-pulse" />
        </div>
      </div>
    </aside>
  );
}
