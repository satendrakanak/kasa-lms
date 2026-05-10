import { ComponentShell } from "@/components/ui-showcase/component-shell";
import { ChartsShowcase } from "@/components/ui-showcase/charts-showcase";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Charts - UI Components",
  description: "Revenue, enrollment, completion, and learner analytics chart examples.",
  path: "/components/charts",
});

export default function ChartsPage() {
  return (
    <ComponentShell
      active="Charts"
      title="Chart examples for admin analytics and learner dashboards."
      description="Preview area charts, bar charts, and donut charts styled for LMS revenue, course progress, and enrollment metrics."
    >
      <ChartsShowcase />
    </ComponentShell>
  );
}
