import Link from "next/link";
import {
  ArrowRight,
  CalendarClock,
  Clapperboard,
  Compass,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface WorkflowStep {
  stepNumber: string;
  title: string;
  subtitle: string;
  description: string;
  highlight: string;
  icon: LucideIcon;
}

const WORKFLOW_STEPS: WorkflowStep[] = [
  {
    stepNumber: "01",
    title: "1. Discover Spaces",
    subtitle: "Filter by Specs & Gear",
    description:
      "Search verified photography cyc walls, NC-20 sound stages, podcast rooms, and music suites by square footage, acoustic rating, and included equipment.",
    highlight: "Real-time floorplans & gear manifests",
    icon: Compass,
  },
  {
    stepNumber: "02",
    title: "2. Select Shoot Hours",
    subtitle: "Dynamic Slot Inspector",
    description:
      "Inspect live hourly availability calendars, add load-in or wrap buffers, and view transparent all-in pricing with zero surprise cleaning or power surcharges.",
    highlight: "Flexible 2-hr to multi-day lockouts",
    icon: CalendarClock,
  },
  {
    stepNumber: "03",
    title: "3. Book Instantly",
    subtitle: "Escrow-Protected Checkout",
    description:
      "Lock in your production slot immediately with instant confirmation, digital call-sheet templates, and automated COI liability coverage.",
    highlight: "Instant digital access codes",
    icon: Zap,
  },
  {
    stepNumber: "04",
    title: "4. Create & Produce",
    subtitle: "Walk Onto a Ready Set",
    description:
      "Arrive to a pre-checked studio with calibrated lighting, patched audio bays, high-speed fiber upload, and on-call host concierge support.",
    highlight: "10 Gbps fiber & on-site tech support",
    icon: Clapperboard,
  },
];

export function HowBookingWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-booking-works-heading"
      className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Consistent Section Heading & Balanced Paragraph Spacing */}
      <div className="mx-auto mb-12 max-w-3xl text-center space-y-3">
        <Badge
          variant="secondary"
          className="h-7 rounded-full px-3.5 text-xs font-semibold text-primary"
        >
          <Sparkles className="mr-1.5 size-3.5" />
          Streamlined Production Workflow
        </Badge>
        <h2
          id="how-booking-works-heading"
          className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
        >
          How StudioSpace Booking Works
        </h2>
        <p className="text-base leading-relaxed text-muted-foreground">
          From initial location scouting to final wrap, our 4-step workflow
          eliminates back-and-forth quotes so your crew can focus entirely on
          production.
        </p>
      </div>

      {/* 4-Step Equal-Height & Equal-Width Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {WORKFLOW_STEPS.map((step) => {
          const Icon = step.icon;
          return (
            <Card
              key={step.stepNumber}
              className="flex h-full flex-col justify-between rounded-2xl border border-border bg-card p-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <CardHeader className="space-y-4 px-5 pt-6 pb-2">
                  <div className="flex items-center justify-between">
                    <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
                      <Icon className="size-6" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-2xl font-bold tracking-tighter text-muted-foreground/40">
                      STEP {step.stepNumber}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs font-semibold tracking-wider text-primary uppercase">
                      {step.subtitle}
                    </span>
                    <CardTitle className="font-heading text-lg font-bold text-foreground">
                      {step.title}
                    </CardTitle>
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-5">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </CardContent>
              </div>

              <CardFooter className="mt-auto border-t border-border bg-muted/30 px-5 py-3.5">
                <span className="text-xs font-semibold text-foreground">
                  {step.highlight}
                </span>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Unified Action Row */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="default"
          render={<Link href="/studios" />}
          className="h-10 rounded-lg px-6 text-sm font-semibold shadow-sm"
        >
          Start Exploring Spaces
          <ArrowRight className="ml-2 size-4" />
        </Button>
        <Button
          variant="outline"
          render={<Link href="/studios" />}
          className="h-10 rounded-lg px-6 text-sm font-semibold"
        >
          List Your Studio Space
        </Button>
      </div>
    </section>
  );
}

