"use client";

import { useState } from "react";
import { Check, ChevronRight, User, CalendarDays, ClipboardCheck } from "lucide-react";
import { patients } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const DEPARTMENTS = [
  "Cardiology",
  "Orthopedics",
  "Neurology",
  "Pulmonology",
  "General Surgery",
  "Gastroenterology",
];

const STEPS = [
  { id: 1, label: "Select Patient", icon: User },
  { id: 2, label: "Details", icon: CalendarDays },
  { id: 3, label: "Confirm", icon: ClipboardCheck },
];

export default function AppointmentsPage() {
  const [step, setStep] = useState(1);
  const [selectedPatientId, setSelectedPatientId] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [booked, setBooked] = useState(false);

  const selectedPatient = patients.find((p) => p.id === selectedPatientId);
  const canProceedStep1 = !!selectedPatientId;
  const canProceedStep2 = !!selectedDate && !!selectedDepartment;

  const handleBook = () => setBooked(true);

  const handleReset = () => {
    setStep(1);
    setSelectedPatientId("");
    setSelectedDate(undefined);
    setSelectedDepartment("");
    setBooked(false);
  };

  return (
    <div className="flex-1 p-8 overflow-y-auto bg-slate-50 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Book Appointment</h1>
        <p className="text-slate-500 text-sm mb-8">
          Schedule a new patient appointment in three simple steps.
        </p>

        {/* ── Stepper ─────────────────────────────────────────── */}
        <div className="flex items-start mb-8">
          {STEPS.map((s, i) => {
            const isCompleted = step > s.id;
            const isActive = step === s.id;
            return (
              <div key={s.id} className="flex items-start flex-1">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={cn(
                      "flex items-center justify-center w-9 h-9 rounded-full border-2 font-semibold text-sm transition-all duration-200",
                      isCompleted
                        ? "bg-green-500 border-green-500 text-white"
                        : isActive
                        ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200"
                        : "bg-white border-slate-300 text-slate-400"
                    )}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.id}
                  </div>
                  <span
                    className={cn(
                      "text-xs font-medium whitespace-nowrap",
                      isCompleted
                        ? "text-green-600"
                        : isActive
                        ? "text-blue-600"
                        : "text-slate-400"
                    )}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={cn(
                      "flex-1 h-0.5 mx-3 mt-4 transition-all duration-200",
                      step > s.id ? "bg-green-400" : "bg-slate-200"
                    )}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* ── Booked success state ─────────────────────────────── */}
        {booked ? (
          <Card className="border-green-200 bg-green-50 ring-1 ring-green-200">
            <CardContent className="flex flex-col items-center gap-4 py-12">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center ring-4 ring-green-200">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <div className="text-center">
                <h2 className="text-xl font-semibold text-green-800">
                  Appointment Booked!
                </h2>
                <p className="text-green-700 text-sm mt-1 max-w-sm">
                  <span className="font-medium">{selectedPatient?.name}</span> has been
                  scheduled for{" "}
                  <span className="font-medium">{selectedDepartment}</span> on{" "}
                  <span className="font-medium">
                    {selectedDate?.toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  .
                </p>
              </div>
              <Button
                onClick={handleReset}
                className="bg-blue-600 hover:bg-blue-700 text-white mt-2"
              >
                Book Another Appointment
              </Button>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* ── Step 1: Select Patient ───────────────────────── */}
            {step === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Select Patient</CardTitle>
                  <CardDescription>
                    Choose the patient you want to book an appointment for.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <Select
                    value={selectedPatientId}
                    onValueChange={setSelectedPatientId}
                  >
                    <SelectTrigger className="w-full h-10">
                      <SelectValue placeholder="Search and select a patient..." />
                    </SelectTrigger>
                    <SelectContent>
                      {patients.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                          <span className="text-muted-foreground ml-1">
                            — {p.condition}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedPatient && (
                    <div className="rounded-lg bg-blue-50 border border-blue-100 p-4 space-y-1.5">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-400 mb-2">
                        Patient Overview
                      </p>
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-sm">
                        <div>
                          <span className="text-slate-500">ID</span>
                          <p className="font-medium text-slate-900">
                            {selectedPatient.id}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500">Age / Gender</span>
                          <p className="font-medium text-slate-900">
                            {selectedPatient.age} · {selectedPatient.gender}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500">Condition</span>
                          <p className="font-medium text-slate-900">
                            {selectedPatient.condition}
                          </p>
                        </div>
                        <div>
                          <span className="text-slate-500">Doctor</span>
                          <p className="font-medium text-slate-900">
                            {selectedPatient.doctor}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* ── Step 2: Details ──────────────────────────────── */}
            {step === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Appointment Details</CardTitle>
                  <CardDescription>
                    Pick a date and choose the department.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-3">
                      Select Date
                    </p>
                    <div className="flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={(date) => {
                          const today = new Date();
                          today.setHours(0, 0, 0, 0);
                          return date < today;
                        }}
                        className="rounded-xl border border-slate-200 shadow-sm"
                      />
                    </div>
                    {selectedDate && (
                      <p className="text-center text-sm text-blue-600 font-medium mt-3">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">
                      Department
                    </p>
                    <Select
                      value={selectedDepartment}
                      onValueChange={setSelectedDepartment}
                    >
                      <SelectTrigger className="w-full h-10">
                        <SelectValue placeholder="Select a department..." />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENTS.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ── Step 3: Confirm ──────────────────────────────── */}
            {step === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle>Confirm Appointment</CardTitle>
                  <CardDescription>
                    Review the details below and confirm to book.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
                    {[
                      { label: "Patient", value: selectedPatient?.name },
                      { label: "Patient ID", value: selectedPatient?.id },
                      {
                        label: "Date",
                        value: selectedDate?.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }),
                      },
                      { label: "Department", value: selectedDepartment },
                      { label: "Condition", value: selectedPatient?.condition },
                      { label: "Assigned Doctor", value: selectedPatient?.doctor },
                    ].map(({ label, value }) => (
                      <div
                        key={label}
                        className="flex items-center gap-4 px-5 py-3 hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-slate-400 text-sm w-32 shrink-0">
                          {label}
                        </span>
                        <span className="font-medium text-slate-900 text-sm">
                          {value}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* ── Navigation buttons ───────────────────────────── */}
            <div className="flex justify-between mt-6">
              {step > 1 ? (
                <Button
                  variant="outline"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              ) : (
                <div />
              )}

              {step < 3 ? (
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                  onClick={() => setStep((s) => s + 1)}
                >
                  Next <ChevronRight className="ml-1 w-4 h-4" />
                </Button>
              ) : (
                <Button
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={handleBook}
                >
                  Book Appointment
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

