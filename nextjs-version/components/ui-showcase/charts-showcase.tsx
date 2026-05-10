"use client";

import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from "recharts";

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ShowcaseSection } from "@/components/ui-showcase/component-shell";

const revenueData = [
  { month: "Jan", revenue: 42000, learners: 120 },
  { month: "Feb", revenue: 56000, learners: 168 },
  { month: "Mar", revenue: 48000, learners: 146 },
  { month: "Apr", revenue: 72000, learners: 210 },
  { month: "May", revenue: 94000, learners: 288 },
  { month: "Jun", revenue: 88000, learners: 264 },
];

const courseData = [
  { course: "Next.js", enrollments: 320 },
  { course: "API", enrollments: 240 },
  { course: "UI", enrollments: 190 },
  { course: "Data AI", enrollments: 170 },
];

const completionData = [
  { name: "Completed", value: 52, fill: "var(--primary)" },
  { name: "In Progress", value: 34, fill: "#38bdf8" },
  { name: "Not Started", value: 14, fill: "#f59e0b" },
];

export function ChartsShowcase() {
  return (
    <div className="space-y-6">
      <ShowcaseSection
        title="Revenue Area Chart"
        description="Smooth dashboard chart for revenue, learners, and marketplace analytics."
      >
        <ChartContainer
          config={{
            revenue: { label: "Revenue", color: "var(--primary)" },
            learners: { label: "Learners", color: "#38bdf8" },
          }}
          className="h-80 w-full"
        >
          <AreaChart data={revenueData} margin={{ left: 8, right: 8, top: 16 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="var(--primary)"
              fill="var(--primary)"
              fillOpacity={0.16}
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="learners"
              stroke="#38bdf8"
              fill="#38bdf8"
              fillOpacity={0.12}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </ShowcaseSection>

      <div className="grid gap-6 xl:grid-cols-2">
        <ShowcaseSection
          title="Course Enrollment Bars"
          description="Horizontal comparison chart for top courses."
        >
          <ChartContainer
            config={{ enrollments: { label: "Enrollments", color: "var(--primary)" } }}
            className="h-72 w-full"
          >
            <BarChart data={courseData} layout="vertical" margin={{ left: 16, right: 16 }}>
              <CartesianGrid horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="course" type="category" tickLine={false} axisLine={false} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="enrollments" radius={10} fill="var(--primary)" />
            </BarChart>
          </ChartContainer>
        </ShowcaseSection>

        <ShowcaseSection
          title="Completion Donut"
          description="Learner status composition for course dashboards."
        >
          <ChartContainer
            config={{
              Completed: { label: "Completed", color: "var(--primary)" },
              "In Progress": { label: "In Progress", color: "#38bdf8" },
              "Not Started": { label: "Not Started", color: "#f59e0b" },
            }}
            className="h-72 w-full"
          >
            <PieChart>
              <ChartTooltip content={<ChartTooltipContent nameKey="name" />} />
              <Pie
                data={completionData}
                dataKey="value"
                nameKey="name"
                innerRadius={62}
                outerRadius={94}
                paddingAngle={4}
              >
                {completionData.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
        </ShowcaseSection>
      </div>
    </div>
  );
}
