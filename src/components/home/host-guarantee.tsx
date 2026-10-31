import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Headset,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AssurancePillar {
  title: string;
  metric: string;
  description: string;
  coverageNote: string;
  icon: LucideIcon;
}

const ASSURANCE_PILLARS: AssurancePillar[] = [
  {
    title: "Liability Protection",
    metric: "$2,000,000 Coverage",
    description:
      "Every confirmed booking includes comprehensive commercial general liability insurance protecting studio hosts, crew members, and architectural property.",
    coverageNote: "Automated digital COI issued per shoot",
    icon: ShieldCheck,
  },
  {
    title: "Verified Profiles",
    metric: "100% ID & Studio Vetted",
    description:
      "All studio hosts undergo physical acoustic/lighting verification and every creator completes government ID and production history screening.",
    coverageNote: "Zero anonymous reservations",
    icon: BadgeCheck,
  },
  {
    title: "Equipment Safety",
    metric: "$250K Gear Escrow",
    description:
      "In-house strobes, cinema lenses, SSL consoles, and vintage microphones are covered by pre-shoot digital check-in manifests and damage protection.",
    coverageNote: "48-hour rapid replacement guarantee",
    icon: Camera,
  },
  {
    title: "24/7 Host Support",
    metric: "< 3 Min Live Response",
    description:
      "Dedicated production specialists stand by around the clock for late-night lockouts, overtime extensions, and real-time booking adjustments.",
    coverageNote: "Direct hotline for active shoots",
    icon: Headset,
  },
];

export function HostGuarantee() {
  return (
    <section
      id="about-us"
      aria-labelledby="host-guarantee-heading"
      className="scroll-mt-20 border-t border-border bg-muted/30 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Consistent Section Heading & Balanced Paragraph Spacing */}
        <div className="mx-auto mb-12 max-w-3xl text-center space-y-3">
          <Badge
            variant="secondary"
            className="h-7 rounded-full px-3.5 text-xs font-semibold text-primary"
          >
            <Sparkles className="mr-1.5 size-3.5" />
            Trust, Safety &amp; Production Assurance
          </Badge>
          <h2
            id="host-guarantee-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Host Guarantee &amp; Creator Support
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Whether you are opening the doors to a million-dollar sound stage or
            booking a two-hour podcast slot, StudioSpace backs every session
            with institutional-grade protection.
          </p>
        </div>

        {/* Equal-Height & Equal-Width Assurance Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCE_PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <Card
                key={pillar.title}
                className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  <CardHeader className="space-y-4 px-5 pt-6 pb-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                        <Icon className="size-6" aria-hidden="true" />
                      </span>
                      <Badge
                        variant="outline"
                        className="rounded-full border-primary/30 bg-primary/5 px-2.5 py-0.5 text-[11px] font-semibold text-primary"
                      >
                        {pillar.metric}
                      </Badge>
                    </div>
                    <CardTitle className="font-heading text-lg font-bold text-foreground">
                      {pillar.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-5 pb-5">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {pillar.description}
                    </p>
                  </CardContent>
                </div>

                <CardFooter className="mt-auto border-t border-border bg-muted/40 px-5 py-3.5">
                  <span className="text-xs font-semibold text-foreground">
                    {pillar.coverageNote}
                  </span>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* Bottom Host & Creator Call-to-Action Banner */}
        <div className="mt-14 overflow-hidden rounded-2xl border border-border bg-foreground p-8 text-background shadow-md sm:p-10 lg:p-12">
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl space-y-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider text-primary uppercase">
                <ShieldCheck className="size-4" />
                Monetize Your Idle Studio Hours
              </span>
              <h3 className="font-heading text-2xl font-bold tracking-tight text-background sm:text-3xl">
                Own a Photo Loft, Sound Stage, or Recording Suite?
              </h3>
              <p className="text-sm leading-relaxed text-background/80 sm:text-base">
                Join 700+ verified studio owners earning predictable revenue
                with custom hourly minimums, automated calendar sync, and $2M
                Host Liability Protection.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              <Button
                variant="default"
                render={<Link href="/studios" />}
                className="h-10 rounded-lg px-6 text-sm font-semibold shadow-sm"
              >
                Host Your Space
                <ArrowRight className="ml-2 size-4" />
              </Button>
              <Button
                variant="outline"
                render={<Link href="/studios" />}
                className="h-10 rounded-lg border-background/25 bg-background/10 px-6 text-sm font-semibold text-background hover:bg-background hover:text-foreground"
              >
                Explore Studios
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

