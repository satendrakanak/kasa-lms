import { BellRing, CheckCircle2, Lock, Moon, ShieldCheck, Video } from "lucide-react";

import { ComponentShell, ShowcaseSection } from "@/components/ui-showcase/component-shell";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Switches & Controls - UI Components",
  description: "Switch, checkbox, radio, slider, progress, and toggle examples for LMS settings.",
  path: "/components/switches",
});

export default function SwitchesPage() {
  return (
    <ComponentShell
      active="Switches"
      title="Switches and controls for settings, filters, and learner states."
      description="Preview binary controls, progress indicators, radio groups, sliders, and segmented controls."
    >
      <div className="space-y-6">
        <ShowcaseSection
          title="Settings Switches"
          description="Common toggles for admin, faculty, and learner settings screens."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <SettingRow icon={Video} title="Live class reminders" description="Notify learners before batch sessions." checked />
            <SettingRow icon={ShieldCheck} title="Certificate approval" description="Require admin approval before issuing." />
            <SettingRow icon={BellRing} title="Push notifications" description="Enable browser notification prompts." checked />
            <SettingRow icon={Moon} title="Dark mode preference" description="Respect learner selected appearance." checked />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Checkboxes and Radios"
          description="Course filters and publish settings with clear control states."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="mb-4 text-sm font-semibold">Course filters</p>
              <div className="space-y-3">
                <label className="flex items-center gap-3"><Checkbox defaultChecked />Free courses</label>
                <label className="flex items-center gap-3"><Checkbox defaultChecked />Certificate included</label>
                <label className="flex items-center gap-3"><Checkbox />Live batches only</label>
              </div>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="mb-4 text-sm font-semibold">Delivery mode</p>
              <RadioGroup defaultValue="hybrid" className="gap-3">
                <label className="flex items-center gap-3"><RadioGroupItem value="self" />Self learning</label>
                <label className="flex items-center gap-3"><RadioGroupItem value="live" />Faculty-led</label>
                <label className="flex items-center gap-3"><RadioGroupItem value="hybrid" />Hybrid</label>
              </RadioGroup>
            </div>
            <div className="rounded-3xl border border-border bg-card p-5">
              <p className="mb-4 text-sm font-semibold">Segmented control</p>
              <ToggleGroup type="single" defaultValue="grid">
                <ToggleGroupItem value="grid">Grid</ToggleGroupItem>
                <ToggleGroupItem value="list">List</ToggleGroupItem>
                <ToggleGroupItem value="masonry">Masonry</ToggleGroupItem>
              </ToggleGroup>
              <Badge className="mt-5">Active: Grid</Badge>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          title="Progress and Sliders"
          description="Learner progress, course completion, attendance, and pricing controls."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-5 rounded-3xl border border-border bg-card p-5">
              <ProgressBlock label="Course completion" value={72} />
              <ProgressBlock label="Live attendance" value={88} />
              <ProgressBlock label="Exam score" value={94} />
            </div>
            <div className="space-y-6 rounded-3xl border border-border bg-card p-5">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Price range</span>
                  <span className="text-xs text-muted-foreground">₹2k - ₹12k</span>
                </div>
                <Slider defaultValue={[25, 85]} max={100} />
              </div>
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">Completion requirement</span>
                  <span className="text-xs text-muted-foreground">75%</span>
                </div>
                <Slider defaultValue={[75]} max={100} />
              </div>
            </div>
          </div>
        </ShowcaseSection>
      </div>
    </ComponentShell>
  );
}

function SettingRow({
  icon: Icon,
  title,
  description,
  checked,
}: {
  icon: typeof Lock;
  title: string;
  description: string;
  checked?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-3xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p className="text-sm font-semibold text-card-foreground">{title}</p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">{description}</p>
        </div>
      </div>
      <Switch defaultChecked={checked} />
    </div>
  );
}

function ProgressBlock({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-semibold">{label}</span>
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <CheckCircle2 className="h-3.5 w-3.5 text-primary" />
          {value}%
        </span>
      </div>
      <Progress value={value} />
    </div>
  );
}
