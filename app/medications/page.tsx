import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { patients } from "@/lib/mockData";

export default function MedicationsPage() {
  // Extract all medications from all patients
  const allMedications = patients.flatMap((patient) =>
    patient.medications.map((med) => ({
      ...med,
      patientName: patient.name,
      patientId: patient.id,
    }))
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">Medications</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Active prescriptions across all patients
        </p>
      </div>

      {/* Medications Table */}
      <Card className="rounded-2xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50 border-b">
              <TableHead className="font-semibold text-slate-900">Patient Name</TableHead>
              <TableHead className="font-semibold text-slate-900">Medication</TableHead>
              <TableHead className="font-semibold text-slate-900">Dosage</TableHead>
              <TableHead className="font-semibold text-slate-900">Frequency</TableHead>
              <TableHead className="font-semibold text-slate-900">Start Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allMedications.map((med) => (
              <TableRow key={med.id} className="hover:bg-slate-50 transition-colors">
                <TableCell className="font-medium text-slate-900">{med.patientName}</TableCell>
                <TableCell className="text-slate-700">{med.name}</TableCell>
                <TableCell className="text-slate-700">{med.dosage}</TableCell>
                <TableCell className="text-slate-700">{med.frequency}</TableCell>
                <TableCell>
                  <Badge variant="outline" className="text-xs font-medium">
                    {med.startDate}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Summary Stats */}
      <div className="text-sm text-muted-foreground">
        Total medications: <span className="font-semibold text-slate-900">{allMedications.length}</span>
      </div>
    </div>
  );
}
