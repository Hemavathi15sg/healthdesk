---
name: dischargeform
description: Create a React form component following HealthDesk conventions.
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

Create a React form component following HealthDesk conventions.
- Use shadcn Form, FormField, FormItem, FormLabel, FormControl, FormMessage
- Use shadcn Input, Textarea, Button components
- Field layout: label above input, consistent gap-4 between fields
- All fields must have FormMessage for inline validation errors
- Submit button: full-width, bg blue-600, shows a Loader2 spinning icon while submitting
- Wrap in a shadcn Card with CardHeader (title + description) and CardContent