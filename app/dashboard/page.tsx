import { Users, Calendar, AlertTriangle, LogOut } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { admissionTrend, dashboardStats } from "@/lib/mockData";
import AdmissionTrendChart from "@/components/AdmissionTrendChart";

const stats = [
  {
    label: "Total Patients",
    value: dashboardStats.totalPatients,
    icon: Users,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    trend: "+12 this week",
    trendUp: true,
    pulse: false,
  },
  {
    label: "Today's Appointments",
    value: dashboardStats.todayAppointments,
    icon: Calendar,
    iconBg: "bg-green-100",
    iconColor: "text-green-500",
    trend: "+3 from yesterday",
    trendUp: true,
    pulse: false,
  },
  {
    label: "Critical Alerts",
    value: dashboardStats.criticalAlerts,
    icon: AlertTriangle,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    trend: "Requires attention",
    trendUp: false,
    pulse: true,
  },
  {
    label: "Discharged Today",
    value: dashboardStats.dischargedToday,
    icon: LogOut,
    iconBg: "bg-violet-100",
    iconColor: "text-violet-600",
    trend: "+2 from yesterday",
    trendUp: true,
    pulse: false,
  },
];

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, iconBg, iconColor, trend, trendUp, pulse }) => (
          <Card key={label} className="bg-white rounded-2xl">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{label}</span>
                <div className={`${iconBg} p-2 rounded-lg`}>
                  <Icon className={`${iconColor} w-4 h-4`} />
                </div>
              </div>
              <p className={`text-3xl font-bold text-slate-800 ${pulse ? "animate-pulse" : ""}`}>
                {value}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span>{trendUp ? "↑" : "↓"}</span>
                {trend}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <AdmissionTrendChart data={admissionTrend} />
    </div>
  );
}

