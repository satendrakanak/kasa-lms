import {
  ComponentShell,
  OverviewCard,
  componentSections,
} from "@/components/ui-showcase/component-shell";
import { Badge } from "@/components/ui/badge";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "UI Components",
  description:
    "Browse Kasa LMS UI component examples for buttons, inputs, tables, charts, switches, and theme controls.",
  path: "/components",
});

export default function ComponentsPage() {
  return (
    <ComponentShell
      title="Component examples built like a marketplace UI kit."
      description="Browse each component family as its own polished demo page with real LMS-flavored examples, variants, states, and layout patterns."
    >
      <div className="space-y-6">
        <div className="academy-card p-5 md:p-6">
          <div className="flex flex-wrap gap-2">
            <Badge>ThemeForest ready</Badge>
            <Badge variant="secondary">Light and dark</Badge>
            <Badge variant="outline">Static demos</Badge>
          </div>
          <h2 className="mt-5 text-2xl font-semibold tracking-tight text-card-foreground">
            UI kit pages
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground">
            Each page shows how the theme components look in realistic LMS
            screens: course cards, checkout forms, admin tables, analytics
            panels, settings toggles, and learner controls.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {componentSections.map((item) => (
            <OverviewCard key={item.href} {...item} />
          ))}
        </div>
      </div>
    </ComponentShell>
  );
}
