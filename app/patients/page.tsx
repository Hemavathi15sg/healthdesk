"use client";

import { useState, useEffect } from "react";
import { Patient } from "@/lib/types";
import { AlertTriangle, Pill, LogOut } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PatientDischargeForm } from "@/components/PatientDischargeForm";

function bloodTypeColor(bloodType: Patient["bloodType"]): string {
  if (bloodType.startsWith("AB")) return "bg-violet-500";
  if (bloodType.startsWith("A")) return "bg-blue-500";
  if (bloodType.startsWith("B")) return "bg-green-500";
  return "bg-orange-500"; // O
}

function patientInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function StatusBadge({ status }: { readonly status: Patient["status"] }) {
  if (status === "Stable") {
    return (
      <Badge variant="outline" className="border-green-500 text-green-600">
        {status}
      </Badge>
    );
  }
  if (status === "Monitoring") {
    return (
      <Badge variant="outline" className="border-amber-500 text-amber-600">
        {status}
      </Badge>
    );
  }
  return <Badge variant="destructive">{status}</Badge>;
}

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetch("/api/patients")
      .then((res) => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`);
        return res.json() as Promise<{ data: Patient[]; count: number }>;
      })
      .then(({ data }) => setPatients(data))
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Unknown error")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Patients</h1>
        <p className="text-muted-foreground">Manage and monitor patient records</p>
      </div>

      {loading && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {(["sk-1", "sk-2", "sk-3"] as const).map((skeletonId) => (
            <Card key={skeletonId} className="animate-pulse">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gray-300" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 rounded bg-gray-300 w-3/4" />
                    <div className="h-3 rounded bg-gray-200 w-1/2" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-5 rounded-full bg-gray-200 w-14" />
                  <div className="h-5 rounded-full bg-gray-200 w-14" />
                  <div className="h-5 rounded-full bg-gray-200 w-10" />
                </div>
                <div className="flex justify-between">
                  <div className="h-4 rounded bg-gray-200 w-2/3" />
                  <div className="h-5 rounded-full bg-gray-200 w-16" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {!loading && error && (
        <Card className="border-red-300 bg-red-50 dark:bg-red-950/20 dark:border-red-800">
          <CardContent className="flex items-center gap-3 p-5">
            <AlertTriangle className="size-5 shrink-0 text-red-600 dark:text-red-400" />
            <div>
              <p className="font-semibold text-red-700 dark:text-red-400">
                Failed to load patients
              </p>
              <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patients.map((patient) => (
          <Card
            key={patient.id}
            className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
            onClick={() => setSelectedPatient(patient)}
          >
            <CardHeader>
              <div className="flex items-center gap-3">
                <Avatar size="lg">
                  <AvatarFallback
                    className={`${bloodTypeColor(patient.bloodType)} text-white font-semibold`}
                  >
                    {patientInitials(patient.name)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle>{patient.name}</CardTitle>
                  <CardDescription>{patient.doctor}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                  Age {patient.age}
                </span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                  {patient.gender}
                </span>
                <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                  {patient.bloodType}
                </span>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground truncate pr-2">
                {patient.condition}
              </span>
              <StatusBadge status={patient.status} />
            </CardFooter>
          </Card>
        ))}
      </div>
      )}

      <Sheet
        open={selectedPatient !== null}
        onOpenChange={(open) => { if (!open) setSelectedPatient(null); }}
      >
        <SheetContent side="right" className="w-[480px] overflow-y-auto">
          {selectedPatient && (
            <>
              <SheetHeader className="border-b pb-4">
                <div className="flex items-center justify-between gap-3 pr-8">
                  <SheetTitle className="text-lg">{selectedPatient.name}</SheetTitle>
                  <StatusBadge status={selectedPatient.status} />
                </div>
              </SheetHeader>

              <div className="flex flex-col gap-6 px-4 py-5">
                {/* Allergies */}
                <section>
                  <h3 className="text-sm font-semibold mb-2">Allergies</h3>
                  {selectedPatient.allergies.length === 0 ? (
                    <span className="text-sm text-muted-foreground">None known</span>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.allergies.map((allergy) => (
                        <Badge key={allergy} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  )}
                </section>

                {/* Medications */}
                <section>
                  <h3 className="text-sm font-semibold mb-2">Current Medications</h3>
                  <ul className="flex flex-col gap-3">
                    {selectedPatient.medications.map((med) => (
                      <li key={med.id} className="flex items-start gap-2">
                        <Pill className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium">
                            {med.name}{" "}
                            <span className="text-muted-foreground font-normal">
                              — {med.dosage}
                            </span>
                          </p>
                          <p className="text-xs text-muted-foreground">{med.frequency}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Diagnosis History */}
                <section>
                  <h3 className="text-sm font-semibold mb-2">Diagnosis History</h3>
                  <ol className="relative border-l border-border ml-2 flex flex-col gap-5">
                    {selectedPatient.diagnosisHistory.map((entry) => (
                      <li key={`${entry.date}-${entry.diagnosis}`} className="pl-4">
                        <span className="absolute -left-1.5 mt-1 size-3 rounded-full border-2 border-background bg-muted-foreground" />
                        <p className="text-xs text-muted-foreground">{entry.date}</p>
                        <p className="text-sm font-bold">{entry.diagnosis}</p>
                        <p className="text-xs text-muted-foreground">{entry.doctor}</p>
                        <p className="text-xs text-muted-foreground italic mt-0.5">{entry.notes}</p>
                      </li>
                    ))}
                  </ol>
                </section>
              </div>

              <SheetFooter className="flex gap-2 px-4 pb-4">
                <Dialog>
                  <DialogTrigger
                    render={
                      <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white gap-2">
                        <LogOut className="w-4 h-4" />
                        Discharge Patient
                      </Button>
                    }
                  />
                  <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Discharge — {selectedPatient.name}</DialogTitle>
                    </DialogHeader>
                    <PatientDischargeForm />
                  </DialogContent>
                </Dialog>
                <SheetClose
                  render={<Button variant="outline" className="flex-1" />}
                >
                  Close
                </SheetClose>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

