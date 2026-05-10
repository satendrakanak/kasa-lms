import { Mail, Search, User } from "lucide-react";

import { ComponentShell, ShowcaseSection } from "@/components/ui-showcase/component-shell";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Inputs - UI Components",
  description: "Input, select, textarea, OTP, checkbox, radio, and LMS form examples.",
  path: "/components/inputs",
});

export default function InputsPage() {
  return (
    <ComponentShell
      active="Inputs"
      title="Input and form examples for checkout, auth, and course forms."
      description="Preview field states, grouped inputs, billing forms, course settings, OTP blocks, and selection controls."
    >
      <div className="space-y-6">
        <ShowcaseSection
          title="Input Variants"
          description="Plain fields, icon fields, disabled fields, and validation-ready examples."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <FieldGroup>
              <Field>
                <FieldLabel>Student name</FieldLabel>
                <Input placeholder="Ava Patel" />
              </Field>
              <Field>
                <FieldLabel>Email address</FieldLabel>
                <InputGroup>
                  <InputGroupAddon><Mail className="h-4 w-4" /></InputGroupAddon>
                  <InputGroupInput type="email" placeholder="student@demo.com" />
                </InputGroup>
              </Field>
              <Field>
                <FieldLabel>Course search</FieldLabel>
                <InputGroup>
                  <InputGroupAddon><Search className="h-4 w-4" /></InputGroupAddon>
                  <InputGroupInput placeholder="Search courses, faculty, tags..." />
                </InputGroup>
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel>Readonly learner ID</FieldLabel>
                <Input value="KASA-LEARNER-1042" readOnly />
                <FieldDescription>Readonly style for generated values.</FieldDescription>
              </Field>
              <Field>
                <FieldLabel>Disabled input</FieldLabel>
                <Input placeholder="Disabled state" disabled />
              </Field>
              <Field>
                <FieldLabel>Invalid input</FieldLabel>
                <Input aria-invalid placeholder="Missing course title" />
                <FieldDescription className="text-destructive">Course title is required.</FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Checkout Form"
          description="A marketplace-style billing form block with selects and textarea."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Field>
              <FieldLabel>First name</FieldLabel>
              <Input placeholder="Ava" />
            </Field>
            <Field>
              <FieldLabel>Last name</FieldLabel>
              <Input placeholder="Patel" />
            </Field>
            <Field>
              <FieldLabel>Country</FieldLabel>
              <Select defaultValue="india">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">India</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <FieldLabel>State</FieldLabel>
              <Select defaultValue="delhi">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="delhi">Delhi</SelectItem>
                  <SelectItem value="maharashtra">Maharashtra</SelectItem>
                  <SelectItem value="karnataka">Karnataka</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field className="md:col-span-2">
              <FieldLabel>Billing address</FieldLabel>
              <Textarea placeholder="House number, street, area" />
            </Field>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Selection Controls"
          description="Radio, checkbox, and OTP examples for course settings and auth flows."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="mb-4 text-sm font-semibold">Course mode</p>
              <RadioGroup defaultValue="hybrid" className="gap-3">
                <label className="flex items-center gap-3"><RadioGroupItem value="recorded" />Recorded</label>
                <label className="flex items-center gap-3"><RadioGroupItem value="live" />Live</label>
                <label className="flex items-center gap-3"><RadioGroupItem value="hybrid" />Hybrid</label>
              </RadioGroup>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="mb-4 text-sm font-semibold">Course options</p>
              <div className="space-y-3">
                <label className="flex items-center gap-3"><Checkbox defaultChecked />Certificate</label>
                <label className="flex items-center gap-3"><Checkbox defaultChecked />Live reminders</label>
                <label className="flex items-center gap-3"><Checkbox />Manual review</label>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="mb-4 text-sm font-semibold">OTP verification</p>
              <InputOTP maxLength={6} value="384921">
                <InputOTPGroup>
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <Button className="mt-5 w-full"><User /> Verify learner</Button>
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </ComponentShell>
  );
}
