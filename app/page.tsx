import { Heart, Users, Calendar, Shield } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-blue-600 shadow-xl shadow-blue-200 mb-6">
        <Heart className="w-10 h-10 text-white" />
      </div>
      <h1 className="text-4xl font-bold text-slate-800 mb-3">Welcome to HealthDesk</h1>
      <p className="text-lg text-slate-500 max-w-md mb-10">
        Your intelligent patient care hub. 
        <br /> Manage patients, appointments, and insights all in one place.

      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl">
        {[
          { label: "View Patients", href: "/patients", icon: Users, color: "bg-blue-50 text-blue-600 hover:bg-blue-100" },
          { label: "Appointments", href: "/appointments", icon: Calendar, color: "bg-green-50 text-green-600 hover:bg-green-100" },
          { label: "Dashboard", href: "/dashboard", icon: Shield, color: "bg-violet-50 text-violet-600 hover:bg-violet-100" },
        ].map(({ label, href, icon: Icon, color }) => (
          <Link
            key={href}
            href={href}
            className={`flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-200 font-medium transition-all ${color}`}
          >
            <Icon className="w-6 h-6" />
            <span className="text-sm">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
