"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const DOCTORS = [
  "Dr. James Carter",
  "Dr. Priya Sharma",
  "Dr. Alan Brooks",
  "Dr. Natalie Wong",
  "Dr. Kevin Mills",
] as const

const DISCHARGE_TYPES = [
  "Home Recovery",
  "Transfer to Another Facility",
  "Against Medical Advice",
] as const

const dischargeSchema = z.object({
  dischargeDate: z.string().min(1, "Discharge date is required"),
  dischargeNotes: z.string().min(1, "Discharge notes are required"),
  followUpDate: z.string().optional(),
  prescribingDoctor: z.string().optional(),
  dischargeType: z.string().optional(),
})

type DischargeFormValues = z.infer<typeof dischargeSchema>

export function PatientDischargeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<DischargeFormValues>({
    resolver: zodResolver(dischargeSchema),
    defaultValues: {
      dischargeDate: "",
      dischargeNotes: "",
      followUpDate: "",
      prescribingDoctor: "",
      dischargeType: "",
    },
  })

  async function onSubmit(values: DischargeFormValues) {
    setIsSubmitting(true)
    try {
      // TODO: wire up to API
      await new Promise((resolve) => setTimeout(resolve, 1000))
      console.log(values)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="bg-white rounded-2xl">
      <CardHeader>
        <CardTitle>Patient Discharge</CardTitle>
        <CardDescription>
          Complete the form below to process the patient discharge.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            {/* Discharge Date */}
            <FormField
              control={form.control}
              name="dischargeDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discharge Date <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discharge Notes */}
            <FormField
              control={form.control}
              name="dischargeNotes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discharge Notes <span className="text-red-500">*</span></FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="Enter discharge notes..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Follow-up Date */}
            <FormField
              control={form.control}
              name="followUpDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Follow-up Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Prescribing Doctor */}
            <FormField
              control={form.control}
              name="prescribingDoctor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Prescribing Doctor</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a doctor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DOCTORS.map((doctor) => (
                        <SelectItem key={doctor} value={doctor}>
                          {doctor}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Discharge Type */}
            <FormField
              control={form.control}
              name="dischargeType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Discharge Type</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select discharge type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DISCHARGE_TYPES.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-2"
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isSubmitting ? "Submitting..." : "Submit Discharge"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
