"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdmissionDataPoint } from "@/lib/types";

interface Props {
  data: AdmissionDataPoint[];
}

export default function AdmissionTrendChart({ data }: Props) {
  return (
    <Card className="bg-white rounded-2xl shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold text-slate-800">
          Patient Admissions (Last 7 Days)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={data} margin={{ top: 10, right: 16, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="admissionsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="dischargesGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />

            <XAxis
              dataKey="day"
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "#94a3b8" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: 13,
              }}
              labelStyle={{ color: "#475569", fontWeight: 600, marginBottom: 4 }}
              itemStyle={{ color: "#64748b" }}
            />

            <Legend
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: 13, paddingTop: 12, color: "#64748b" }}
              formatter={(value) =>
                value === "admissions" ? "Admissions" : "Discharges"
              }
            />

            <Area
              type="monotone"
              dataKey="admissions"
              stroke="#2563eb"
              strokeWidth={2.5}
              fill="url(#admissionsGrad)"
              dot={{ r: 3.5, fill: "#2563eb", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#2563eb" }}
            />
            <Area
              type="monotone"
              dataKey="discharges"
              stroke="#22c55e"
              strokeWidth={2.5}
              fill="url(#dischargesGrad)"
              dot={{ r: 3.5, fill: "#22c55e", strokeWidth: 0 }}
              activeDot={{ r: 5, fill: "#22c55e" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
