import { ArrowRight, BookOpen, Check, Download, Heart, PlayCircle, Plus, Settings, ShoppingCart, Trash2 } from "lucide-react";

import { ComponentShell, ShowcaseSection } from "@/components/ui-showcase/component-shell";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Buttons - UI Components",
  description: "Button variants, sizes, icon buttons, CTA groups, and LMS action examples.",
  path: "/components/buttons",
});

export default function ButtonsPage() {
  return (
    <ComponentShell
      active="Buttons"
      title="Button examples for course, checkout, and admin actions."
      description="Preview primary CTAs, secondary actions, destructive states, icon-only buttons, and grouped controls."
    >
      <div className="space-y-6">
        <ShowcaseSection
          title="Variants"
          description="Core button treatments used across public pages and dashboards."
        >
          <div className="flex flex-wrap gap-3">
            <Button><BookOpen /> Primary</Button>
            <Button variant="secondary"><Heart /> Secondary</Button>
            <Button variant="outline"><Download /> Outline</Button>
            <Button variant="ghost"><Settings /> Ghost</Button>
            <Button variant="destructive"><Trash2 /> Destructive</Button>
            <Button variant="link">Text link</Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Sizes"
          description="Compact admin actions, default buttons, large CTAs, and icon buttons."
        >
          <div className="flex flex-wrap items-center gap-3">
            <Button size="xs">Extra small</Button>
            <Button size="sm">Small</Button>
            <Button>Default</Button>
            <Button size="lg">Large CTA</Button>
            <Button size="icon-xs" aria-label="Add"><Plus /></Button>
            <Button size="icon-sm" variant="outline" aria-label="Settings"><Settings /></Button>
            <Button size="icon-lg" variant="secondary" aria-label="Play"><PlayCircle /></Button>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="LMS Action Groups"
          description="Ready combinations for course purchase, learner progress, and admin workflows."
        >
          <div className="grid gap-5 xl:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="mb-4 text-sm font-semibold text-card-foreground">Course card actions</p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full"><ShoppingCart /> Add to cart</Button>
                <Button variant="outline" className="rounded-full">Preview</Button>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="mb-4 text-sm font-semibold text-card-foreground">Learner actions</p>
              <div className="flex flex-wrap gap-3">
                <Button className="rounded-full"><PlayCircle /> Continue</Button>
                <Button variant="secondary" className="rounded-full"><Check /> Complete</Button>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="mb-4 text-sm font-semibold text-card-foreground">Button group</p>
              <ButtonGroup>
                <Button variant="outline">Draft</Button>
                <Button variant="outline">Review</Button>
                <Button>Publish <ArrowRight /></Button>
              </ButtonGroup>
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </ComponentShell>
  );
}
