import { Download, Filter, MoreHorizontal, Search } from "lucide-react";

import { ComponentShell, ShowcaseSection } from "@/components/ui-showcase/component-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Tables - UI Components",
  description: "Course, order, learner, invoice, and compact table examples for Kasa LMS.",
  path: "/components/tables",
});

const courses = [
  ["Full-Stack Next.js", "Hybrid", "Ava Patel", "₹6,999", "Published"],
  ["API Architecture", "Recorded", "Noah Reed", "₹7,999", "Published"],
  ["Product Design Sprint", "Live", "Sophia Lee", "₹4,999", "Review"],
  ["Cloud DevOps Foundations", "Recorded", "Omar Brooks", "₹6,499", "Draft"],
];

const learners = [
  ["Priya Sharma", "Full-Stack Next.js", "86%", "Passed"],
  ["Kabir Malhotra", "Cloud DevOps", "64%", "In Progress"],
  ["Anika Rao", "Product Design", "92%", "Passed"],
];

export default function TablesPage() {
  return (
    <ComponentShell
      active="Tables"
      title="Table examples for admin dashboards and learner records."
      description="Preview dense tables, filter bars, selectable rows, status badges, progress cells, and action columns."
    >
      <div className="space-y-6">
        <ShowcaseSection
          title="Course Management Table"
          description="A full-width admin table with toolbar, selection, status, and row actions."
        >
          <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <InputGroup className="max-w-sm">
              <InputGroupAddon><Search className="h-4 w-4" /></InputGroupAddon>
              <InputGroupInput placeholder="Search courses..." />
            </InputGroup>
            <div className="flex gap-2">
              <Button variant="outline"><Filter /> Filter</Button>
              <Button><Download /> Export</Button>
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-10"><Checkbox /></TableHead>
                <TableHead>Course</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead>Faculty</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {courses.map((row) => (
                <TableRow key={row[0]}>
                  <TableCell><Checkbox /></TableCell>
                  <TableCell className="font-semibold">{row[0]}</TableCell>
                  <TableCell>{row[1]}</TableCell>
                  <TableCell>{row[2]}</TableCell>
                  <TableCell>{row[3]}</TableCell>
                  <TableCell>
                    <Badge variant={row[4] === "Published" ? "default" : row[4] === "Draft" ? "outline" : "secondary"}>
                      {row[4]}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="icon-sm" variant="ghost" aria-label="More">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ShowcaseSection>

        <div className="grid gap-6 xl:grid-cols-2">
          <ShowcaseSection
            title="Learner Progress"
            description="Compact table with progress bars and pass states."
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Learner</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Progress</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {learners.map((row) => (
                  <TableRow key={row[0]}>
                    <TableCell className="font-semibold">{row[0]}</TableCell>
                    <TableCell>{row[1]}</TableCell>
                    <TableCell>
                      <div className="min-w-32">
                        <Progress value={Number(row[2].replace("%", ""))} />
                        <span className="mt-1 block text-xs text-muted-foreground">{row[2]}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={row[3] === "Passed" ? "default" : "outline"}>
                        {row[3]}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ShowcaseSection>

          <ShowcaseSection
            title="Invoice Summary"
            description="Simple invoice and checkout-style table layout."
          >
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Qty</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>API Architecture Bootcamp</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell className="text-right">₹7,999</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>GST included</TableCell>
                  <TableCell>-</TableCell>
                  <TableCell className="text-right">₹1,220</TableCell>
                </TableRow>
                <TableRow className="bg-muted/50 font-semibold">
                  <TableCell>Total</TableCell>
                  <TableCell>1</TableCell>
                  <TableCell className="text-right">₹7,999</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </ShowcaseSection>
        </div>
      </div>
    </ComponentShell>
  );
}
