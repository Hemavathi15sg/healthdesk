import { NextRequest, NextResponse } from "next/server";
import { Patient } from "@/lib/types";
import { patients } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const status = searchParams.get("status");

    const filtered: Patient[] = status
      ? patients.filter((p) => p.status === status)
      : patients;

    return NextResponse.json({ data: filtered, count: filtered.length });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch patients" },
      { status: 500 }
    );
  }
}
