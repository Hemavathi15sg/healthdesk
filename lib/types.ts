export type PatientStatus = "Stable" | "Monitoring" | "Critical";

export type BloodType = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";

export interface DiagnosisEntry {
  date: string;
  diagnosis: string;
  doctor: string;
  notes: string;
}

export interface Medication {
  id: string;
  patientId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: "Male" | "Female";
  bloodType: BloodType;
  condition: string;
  status: PatientStatus;
  admittedDate: string;
  doctor: string;
  department: string;
  allergies: string[];
  medications: Medication[];
  diagnosisHistory: DiagnosisEntry[];
  phone: string;
  email: string;
}

export type AppointmentStatus = "Scheduled" | "Completed" | "Cancelled" | "In Progress";
export type AppointmentType = "Consultation" | "Follow-up" | "Emergency" | "Routine Checkup" | "Surgery";

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: string;
  time: string;
  department: string;
  doctor: string;
  type: AppointmentType;
  status: AppointmentStatus;
  notes?: string;
}

export interface AdmissionDataPoint {
  day: string;
  admissions: number;
  discharges: number;
}

export interface DashboardStats {
  totalPatients: number;
  todayAppointments: number;
  criticalAlerts: number;
  dischargedToday: number;
  weeklyAdmissions: number;
  avgStayDays: number;
}
