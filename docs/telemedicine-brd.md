# Business Requirements Document: Telemedicine Feature

**Project:** HealthDesk — Telemedicine Module  
**Version:** 1.0  
**Date:** April 16, 2026  
**Status:** Draft

---

## 1. Executive Summary

HealthDesk will be extended with a Telemedicine module that enables clinicians and patients to conduct secure, HIPAA-compliant video consultations directly within the existing patient management dashboard. This feature reduces unnecessary in-person visits, improves access to care for remote patients, and tightens the feedback loop between care teams and the patients they manage. By integrating scheduling, video sessions, and post-visit documentation into a single workflow, the module eliminates the need for third-party telehealth platforms and keeps all clinical data centralised in HealthDesk.

---

## 2. Stakeholders

| Role | Name | Responsibility |
|---|---|---|
| Product Owner | Dr. John Doe (Administrator) | Final sign-off on scope and acceptance criteria; aligns feature with clinical operations |
| Clinical Lead | Dr. Priya Sharma | Defines clinical workflows, reviews user stories, validates compliance requirements |
| Lead Developer | TBD (Engineering) | Architects and implements the telemedicine module; owns technical design decisions |
| QA Engineer | TBD (Quality Assurance) | Writes and executes test plans; validates acceptance criteria before release |
| Compliance Officer | TBD (Legal / Compliance) | Ensures the feature meets HIPAA, state telehealth regulations, and data-privacy obligations |
| Patient Advocate | TBD (Patient Services) | Represents patient needs; reviews accessibility and usability of the patient-facing experience |
| IT Security Lead | TBD (InfoSec) | Reviews end-to-end encryption, authentication controls, and penetration-test results |

---

## 3. User Stories

### US-01 — Schedule a Telemedicine Appointment

> **As a** clinician,  
> **I want to** schedule a telemedicine appointment for a patient directly from the HealthDesk dashboard,  
> **So that** the patient receives a confirmed consultation slot without needing a separate booking system.

**Given** the clinician is viewing a patient's profile,  
**When** they select "Schedule Telemedicine" and choose an available date, time, and department,  
**Then** the appointment is saved with type "Telemedicine", the patient receives an email confirmation, and the session appears in the Appointments list.

---

### US-02 — Join a Video Consultation

> **As a** clinician,  
> **I want to** launch a secure video call from an upcoming telemedicine appointment entry,  
> **So that** I can conduct the consultation without leaving the HealthDesk platform.

**Given** the clinician has a telemedicine appointment with status "Scheduled" that is within 10 minutes of its start time,  
**When** they click "Join Session" on the appointment card,  
**Then** a HIPAA-compliant video call opens in a new window or embedded panel, the appointment status changes to "In Progress", and the session start time is logged against the patient's record.

---

### US-03 — Record Post-Consultation Notes

> **As a** clinician,  
> **I want to** submit clinical notes and prescription updates immediately after a telemedicine session ends,  
> **So that** the patient's medical record is kept accurate and up-to-date in real time.

**Given** a telemedicine session has ended,  
**When** the clinician completes and submits the post-consultation form (diagnosis, notes, and any new medications),  
**Then** the new diagnosis entry is appended to the patient's `diagnosisHistory`, any new medications are added to the patient's `medications` list, and the appointment status is updated to "Completed".

---

### US-04 — Receive Appointment Reminder

> **As a** patient,  
> **I want to** receive an automated reminder 24 hours before my scheduled telemedicine appointment,  
> **So that** I have enough time to prepare and join the session on time.

**Given** a telemedicine appointment is saved with a start time more than 24 hours in the future,  
**When** the system clock reaches exactly 24 hours before that start time,  
**Then** an automated email and in-app notification are dispatched to the patient's registered email address with the appointment date, time, doctor's name, and a secure join link.

---

### US-05 — View Telemedicine Session History

> **As a** clinician or administrator,  
> **I want to** filter the Appointments list to show only telemedicine sessions and see their status and duration,  
> **So that** I can audit past consultations and identify patients who may need follow-up.

**Given** the clinician is on the Appointments page,  
**When** they apply the filter "Type: Telemedicine",  
**Then** only appointments with `type === "Telemedicine"` are displayed, each row shows the session duration (if completed), and the list can be exported as a CSV file.

---

## 4. Functional Requirements

1. **Appointment Type** — The system shall support a new appointment type `"Telemedicine"` alongside the existing types (e.g., Check-up, Follow-up) in the `AppointmentType` union and throughout all booking and display interfaces.

2. **Scheduling Interface** — Clinicians shall be able to create a telemedicine appointment from both the Appointments page and an individual patient profile page, pre-populating the patient name and ID automatically.

3. **Video Session Launch** — The system shall provide a "Join Session" control on telemedicine appointment cards that becomes active 10 minutes before the scheduled start time and remains active until the appointment is marked "Completed" or "No Show".

4. **Encrypted Video Communication** — All video and audio streams shall be transmitted over an end-to-end encrypted channel (minimum TLS 1.2 / DTLS-SRTP for WebRTC media) to comply with HIPAA technical safeguard requirements.

5. **Post-Consultation Form** — Upon session end, the system shall present the clinician with a structured form to record diagnosis text, clinical notes, and any new medication entries (name, dosage, frequency, start date) before the appointment is finalised.

6. **Automated Notifications** — The system shall send appointment confirmation emails at booking time and reminder notifications (email and in-app) 24 hours before and 30 minutes before each telemedicine session.

7. **Patient Join Link** — Each confirmed telemedicine appointment shall generate a unique, time-limited, secure join URL that is included in patient notification emails and expires 30 minutes after the scheduled end time.

8. **Appointment Status Lifecycle** — Telemedicine appointment status shall follow the lifecycle: `Scheduled → In Progress → Completed` (or `Cancelled` / `No Show`), with timestamps recorded for each transition.

9. **Session Duration Logging** — The system shall automatically record the actual start and end time of each video session and display the calculated duration (in minutes) on the completed appointment record.

10. **Telemedicine Filter** — The Appointments page shall include a filter control enabling users to isolate appointments by type, including a dedicated "Telemedicine" option, with results exportable to CSV.

11. **Role-Based Access** — Only authenticated users with the `clinician` or `administrator` role shall be permitted to initiate, join, or close telemedicine sessions; patients shall access sessions exclusively via their unique join link.

12. **Audit Logging** — Every significant telemedicine event (appointment created, session joined, session ended, notes submitted) shall be written to an immutable audit log capturing the user ID, timestamp, and action type.

---

## 5. Non-Functional Requirements

### 5.1 Performance

- The telemedicine scheduling interface shall load within **2 seconds** on a standard broadband connection (≥ 10 Mbps).
- Video session initiation (from clicking "Join Session" to live video feed) shall complete within **5 seconds** under normal network conditions.
- The system shall support at least **50 concurrent telemedicine sessions** without degradation in video quality or API response times.
- All REST API endpoints supporting telemedicine operations shall respond within **500 ms** at the 95th percentile under expected load.

### 5.2 Security

- All data in transit shall be encrypted using **TLS 1.2 or higher**; video/audio media streams shall use **DTLS-SRTP**.
- Session join links shall be single-use tokens (or time-scoped tokens expiring 30 minutes after session end) to prevent unauthorised replay access.
- The platform shall enforce **multi-factor authentication (MFA)** for all clinician and administrator accounts.
- All video session data shall be stored (where retention is required) in encrypted storage with AES-256, and access shall be logged in the audit trail.
- The application shall undergo a **penetration test** prior to the production release of the Telemedicine module.

### 5.3 Compliance

- The Telemedicine module shall comply fully with the **Health Insurance Portability and Accountability Act (HIPAA)** Privacy Rule and Security Rule, including:
  - All Protected Health Information (PHI) transmitted or stored during telemedicine sessions must be safeguarded under HIPAA technical, administrative, and physical safeguard requirements.
  - Business Associate Agreements (BAAs) must be in place with any third-party video infrastructure providers.
  - Patient consent for telemedicine consultations must be obtained and recorded prior to the first session.
- The feature shall comply with applicable **state telehealth practice laws**, including cross-state licensure requirements where relevant.
- **GDPR** considerations shall be addressed for any patient data belonging to individuals located in the European Union.
- Session recordings (if enabled) shall be retained according to the organisation's **medical records retention policy** (minimum 7 years for adult patients) and be accessible only to authorised personnel.

---

## 6. Acceptance Criteria

### AC-01 — Schedule a Telemedicine Appointment (US-01)

| # | Criterion | Pass Condition |
|---|---|---|
| AC-01-1 | Telemedicine appointment creation | A clinician can create a new appointment of type "Telemedicine" from both the Appointments page and a patient profile page without errors. |
| AC-01-2 | Patient pre-population | When initiated from a patient profile, the patient name and ID fields are pre-populated and non-editable. |
| AC-01-3 | Confirmation email | The patient's registered email address receives a confirmation email within 60 seconds of the appointment being saved, containing the date, time, doctor name, and a valid join link. |
| AC-01-4 | Appointments list update | The new telemedicine appointment appears in the Appointments list with the correct date, time, status "Scheduled", and type "Telemedicine" immediately after creation. |
| AC-01-5 | Duplicate prevention | The system rejects a second telemedicine appointment for the same patient, doctor, and time slot and displays a meaningful validation error. |

---

### AC-02 — Join a Video Consultation (US-02)

| # | Criterion | Pass Condition |
|---|---|---|
| AC-02-1 | "Join Session" availability | The "Join Session" button is disabled (visually and functionally) until 10 minutes before the scheduled start time. |
| AC-02-2 | Session launch | Clicking "Join Session" opens a video call that displays live video and audio within 5 seconds on a standard broadband connection. |
| AC-02-3 | Status update | The appointment status changes from "Scheduled" to "In Progress" as soon as the clinician joins, and this change is visible to other authenticated users within 3 seconds. |
| AC-02-4 | Session start time logged | The actual session start time is recorded on the appointment record and visible in the appointment detail view. |
| AC-02-5 | Encryption verified | Network traffic for the video session uses TLS 1.2+ and DTLS-SRTP (verifiable via browser developer tools or infrastructure logs). |

---

### AC-03 — Record Post-Consultation Notes (US-03)

| # | Criterion | Pass Condition |
|---|---|---|
| AC-03-1 | Form availability | The post-consultation form is automatically presented to the clinician within 10 seconds of the video session ending. |
| AC-03-2 | Diagnosis recorded | Submitted diagnosis text appears as a new entry in the patient's `diagnosisHistory` with the correct date, doctor name, and notes. |
| AC-03-3 | Medication recorded | Any medications added via the form appear in the patient's `medications` list with all required fields (name, dosage, frequency, startDate). |
| AC-03-4 | Appointment status | The appointment status changes to "Completed" only after the post-consultation form is successfully submitted. |
| AC-03-5 | Form validation | Attempting to submit the form with the diagnosis field empty displays an inline validation error and prevents submission. |
