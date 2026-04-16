
# HealthDesk Copilot Instructions

## Project
Next.js 14, TypeScript, Tailwind CSS, shadcn/ui, lucide-react, recharts.
Healthcare patient management dashboard — HealthDesk.

## Code Conventions
- All UI uses shadcn/ui primitives (Card, Badge, Button, Sheet, Table etc.)
- Icons: always lucide-react, never heroicons or other icon libs
- No inline styles — Tailwind CSS only
- Always use TypeScript types from @/lib/types — never use `any`
- Responsive: always mobile-first with Tailwind breakpoints (sm, md, lg, xl)

## Stat Card Pattern
Stat cards must follow this exact pattern:
  - shadcn Card wrapper, white background, rounded-2xl
  - Top row: label text-sm text-muted-foreground on left, colored lucide icon in a rounded-lg tinted box on right  
  - Large metric: text-3xl font-bold text-slate-800
  - Bottom row: small trend text with up/down arrow

## Color System
- Primary / Patients: blue-600
- Success / Stable: green-500
- Warning / Monitoring: amber-500
- Danger / Critical: red-500
- Discharged: violet-600