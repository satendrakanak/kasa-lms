import { Bell, BookOpen, CheckCircle2, CreditCard, Download, Search, Settings } from "lucide-react";
import type React from "react";

import Container from "@/components/container";
import { PageHero } from "@/components/sliders/page-hero";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "UI Components",
  description: "Preview LMS theme UI components including forms, tables, tabs, badges, alerts, controls, and cards.",
  path: "/components",
});

const rows = [
  ["Full-Stack Next.js", "Hybrid", "₹6,999", "Published"],
  ["API Architecture", "Recorded", "₹7,999", "Draft"],
  ["Product Design Sprint", "Live", "₹4,999", "Published"],
];

export default function ComponentsPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-(--surface-shell)" />
      </div>

      <div className="relative z-10">
        <PageHero
          pageTitle="UI Kit"
          pageHeadline="Reusable components for LMS pages, dashboards, and checkout."
          pageDescription="Preview common controls and layout primitives used across the static Next.js theme."
        />

        <section className="py-12 pb-20">
          <Container>
            <Tabs defaultValue="forms" className="gap-6">
              <TabsList className="academy-card flex h-auto w-full flex-wrap justify-start gap-2 bg-card p-2">
                <TabsTrigger value="forms" className="h-10 px-4">Forms</TabsTrigger>
                <TabsTrigger value="tables" className="h-10 px-4">Tables</TabsTrigger>
                <TabsTrigger value="feedback" className="h-10 px-4">Feedback</TabsTrigger>
                <TabsTrigger value="controls" className="h-10 px-4">Controls</TabsTrigger>
              </TabsList>

              <TabsContent value="forms">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Card className="academy-card">
                    <CardHeader>
                      <CardTitle>Billing Form</CardTitle>
                      <CardDescription>Inputs, selects, textarea, and grouped actions.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="First name"><Input placeholder="Ava" /></Field>
                        <Field label="Last name"><Input placeholder="Patel" /></Field>
                      </div>
                      <Field label="Search">
                        <InputGroup>
                          <InputGroupAddon><Search className="h-4 w-4" /></InputGroupAddon>
                          <InputGroupInput placeholder="Search courses..." />
                        </InputGroup>
                      </Field>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="State">
                          <Select defaultValue="delhi">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="delhi">Delhi</SelectItem>
                              <SelectItem value="maharashtra">Maharashtra</SelectItem>
                              <SelectItem value="karnataka">Karnataka</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                        <Field label="Course type">
                          <Select defaultValue="hybrid">
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="recorded">Recorded</SelectItem>
                              <SelectItem value="live">Live</SelectItem>
                              <SelectItem value="hybrid">Hybrid</SelectItem>
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <Field label="Message"><Textarea placeholder="Write learner note..." /></Field>
                      <div className="flex flex-wrap gap-3">
                        <Button size="lg"><CreditCard className="h-4 w-4" /> Submit</Button>
                        <Button size="lg" variant="outline">Cancel</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="academy-card">
                    <CardHeader>
                      <CardTitle>Course Settings</CardTitle>
                      <CardDescription>Checkbox, radio, toggle, switch, slider, and progress.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center gap-3"><Checkbox defaultChecked id="certificate" /><Label htmlFor="certificate">Enable certificate</Label></div>
                      <RadioGroup defaultValue="hybrid" className="grid gap-3">
                        <label className="flex items-center gap-3"><RadioGroupItem value="recorded" />Recorded course</label>
                        <label className="flex items-center gap-3"><RadioGroupItem value="hybrid" />Hybrid course</label>
                      </RadioGroup>
                      <div className="flex items-center justify-between rounded-2xl border border-border p-4">
                        <span className="text-sm font-semibold">Published</span>
                        <Switch defaultChecked />
                      </div>
                      <Slider defaultValue={[72]} max={100} />
                      <Progress value={68} />
                      <ToggleGroup type="single" defaultValue="grid">
                        <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
                        <ToggleGroupItem value="list">List</ToggleGroupItem>
                        <ToggleGroupItem value="masonry">Masonry</ToggleGroupItem>
                      </ToggleGroup>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="tables">
                <Card className="academy-card">
                  <CardHeader>
                    <CardTitle>Course Table</CardTitle>
                    <CardDescription>Dense admin-ready table styling.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Course</TableHead>
                          <TableHead>Mode</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rows.map((row) => (
                          <TableRow key={row[0]}>
                            {row.map((cell, index) => (
                              <TableCell key={cell}>
                                {index === 3 ? <Badge variant={cell === "Published" ? "default" : "outline"}>{cell}</Badge> : cell}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="feedback">
                <div className="grid gap-6 lg:grid-cols-2">
                  <Alert>
                    <CheckCircle2 className="h-4 w-4" />
                    <AlertTitle>Course published</AlertTitle>
                    <AlertDescription>The static demo is ready for marketplace preview.</AlertDescription>
                  </Alert>
                  <Card className="academy-card">
                    <CardHeader>
                      <CardTitle>Accordion</CardTitle>
                      <CardDescription>FAQ and course curriculum sections.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="one">
                          <AccordionTrigger>Can I customize static data?</AccordionTrigger>
                          <AccordionContent>Yes. Update the local static API seed objects.</AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="two">
                          <AccordionTrigger>Does checkout require Razorpay?</AccordionTrigger>
                          <AccordionContent>No. The theme uses demo checkout mode.</AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="controls">
                <Card className="academy-card">
                  <CardHeader>
                    <CardTitle>Actions</CardTitle>
                    <CardDescription>Buttons, badges, tooltip, separator, and compact commands.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-wrap gap-3">
                      <Button><BookOpen /> Primary</Button>
                      <Button variant="secondary"><Bell /> Secondary</Button>
                      <Button variant="outline"><Download /> Outline</Button>
                      <Button variant="ghost"><Settings /> Ghost</Button>
                    </div>
                    <Separator />
                    <div className="flex flex-wrap gap-2">
                      <Badge>Published</Badge>
                      <Badge variant="secondary">Hybrid</Badge>
                      <Badge variant="outline">Beginner</Badge>
                      <Badge variant="destructive">Needs review</Badge>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button size="icon" variant="outline"><Settings className="h-4 w-4" /></Button>
                        </TooltipTrigger>
                        <TooltipContent>Open settings</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Container>
        </section>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
