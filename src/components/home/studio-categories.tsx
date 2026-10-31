import Link from "next/link";
import {
  ArrowRight,
  Camera,
  Film,
  Mic2,
  Music4,
  Palette,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import type { StudioCategory } from "@/types/studio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryCardItem {
  name: StudioCategory;
  tagline: string;
  description: string;
  countLabel: string;
  avgRate: string;
  image: string;
  icon: LucideIcon;
}

const CATEGORIES: CategoryCardItem[] = [
  {
    name: "Photo Studios",
    tagline: "Cyc Walls & Daylight Lofts",
    description:
      "Pre-lit seamless cycloramas, architectural lofts, and commercial fashion sets stocked with Profoto strobes.",
    countLabel: "180+ Verified Spaces",
    avgRate: "From $65 / hr",
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=900&q=80",
    icon: Camera,
  },
  {
    name: "Sound Stages",
    tagline: "Cinema & XR LED Volumes",
    description:
      "Acoustically rated NC-20 stages with motorized lighting grids, 3-phase camlock power, and drive-in access.",
    countLabel: "75+ Verified Stages",
    avgRate: "From $180 / hr",
    image:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
    icon: Film,
  },
  {
    name: "Podcast Rooms",
    tagline: "Multi-Cam Broadcast Lounges",
    description:
      "Turnkey vocal and video podcast sets featuring Shure SM7dB chains, 4K cinema cameras, and live switchers.",
    countLabel: "210+ Verified Lounges",
    avgRate: "From $55 / hr",
    image:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?auto=format&fit=crop&w=900&q=80",
    icon: Mic2,
  },
  {
    name: "Music Suites",
    tagline: "Tracking & Dolby Atmos Mix",
    description:
      "Treated live tracking rooms, analog SSL/Neve consoles, and calibrated 7.1.4 spatial audio mixing environments.",
    countLabel: "145+ Verified Suites",
    avgRate: "From $85 / hr",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=900&q=80",
    icon: Music4,
  },
  {
    name: "Art Workshops",
    tagline: "Ateliers, Kilns & Set Fabrication",
    description:
      "Industrial makerspaces, sculpture studios, and fine art lofts with ventilation, hoists, and north skylights.",
    countLabel: "90+ Verified Workshops",
    avgRate: "From $45 / hr",
    image:
      "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&w=900&q=80",
    icon: Palette,
  },
];

export function StudioCategories() {
  return (
    <section
      aria-labelledby="studio-categories-heading"
      className="border-y border-border bg-muted/40 py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Consistent Section Heading & Balanced Paragraph Spacing */}
        <div className="mx-auto mb-12 max-w-3xl text-center space-y-3">
          <Badge
            variant="secondary"
            className="h-7 rounded-full px-3.5 text-xs font-semibold text-primary"
          >
            <Sparkles className="mr-1.5 size-3.5" />
            Purpose-Built Creative Environments
          </Badge>
          <h2
            id="studio-categories-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Browse by Studio Categories
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Select a specialized studio discipline below to filter spaces with
            the exact acoustic rating, lighting grid, or creative workflow your
            production demands.
          </p>
        </div>

        {/* Equal-Height & Equal-Width Category Cards Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            const href = `/studios?category=${encodeURIComponent(category.name)}`;
            return (
              <Card
                key={category.name}
                className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
              >
                <div>
                  {/* Uniform Image Aspect Ratio */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <img
                      src={category.image}
                      alt={category.name}
                      loading="lazy"
                      width={480}
                      height={300}
                      className="size-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                    />
                    <div className="absolute top-3 left-3 flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                      <Icon className="size-4.5" aria-hidden="true" />
                    </div>
                    <span className="absolute right-3 bottom-3 rounded-md bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-xs">
                      {category.avgRate}
                    </span>
                  </div>

                  <CardHeader className="space-y-1 px-4 pt-4 pb-2">
                    <span className="text-[11px] font-semibold tracking-wider text-primary uppercase">
                      {category.countLabel}
                    </span>
                    <CardTitle className="font-heading text-lg font-bold text-foreground">
                      {category.name}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="px-4 pb-4">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>
                  </CardContent>
                </div>

                <CardFooter className="mt-auto border-t border-border bg-muted/30 p-4">
                  <Button
                    variant="default"
                    render={<Link href={href} />}
                    className="h-10 w-full rounded-lg text-xs font-semibold shadow-sm"
                  >
                    Explore {category.name}
                    <ArrowRight className="ml-1.5 size-3.5" />
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

