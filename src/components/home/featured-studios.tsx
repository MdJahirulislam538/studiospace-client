import Link from "next/link";
import { ArrowRight, MapPin, Sparkles, Star, Users, Maximize2 } from "lucide-react";
import type { StudioItem } from "@/types/studio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface FeaturedStudiosProps {
  studios: StudioItem[];
}

export function FeaturedStudios({ studios }: FeaturedStudiosProps) {
  return (
    <section
      aria-labelledby="featured-studios-heading"
      className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Section Header — Consistent Heading Style & Paragraph Spacing */}
      <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-2xl space-y-3">
          <Badge
            variant="secondary"
            className="h-7 rounded-full px-3.5 text-xs font-semibold text-primary"
          >
            <Sparkles className="mr-1.5 size-3.5" />
            Curated &amp; Verified Spaces
          </Badge>
          <h2
            id="featured-studios-heading"
            className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Featured Production Studios
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Explore our six top-rated creative workspaces—acoustically tested,
            pre-equipped with industry-standard lighting and audio gear, and
            ready for instant hourly reservation.
          </p>
        </div>

        <Button
          variant="outline"
          render={<Link href="/studios" />}
          className="h-10 shrink-0 rounded-lg px-5 text-sm font-semibold"
        >
          View All Studios
          <ArrowRight className="ml-2 size-4" />
        </Button>
      </div>

      {/* Uniform 3-Column Grid with Equal-Height Cards & Uniform Image Sizes */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {studios.slice(0, 6).map((studio) => (
          <Card
            key={studio._id}
            className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div>
              {/* Uniform Aspect-Ratio Studio Image Container */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={studio.image}
                  alt={studio.title}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="size-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
                />

                {/* Top Overlay: Category Badge & Rating Badge */}
                <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                  <Badge className="h-6 rounded-full bg-background/95 px-3 text-xs font-semibold text-foreground shadow-xs backdrop-blur-md">
                    {studio.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    <Star className="size-3.5 fill-primary text-primary" />
                    {studio.rating.toFixed(2)}
                    <span className="text-[11px] font-normal text-white/75">
                      ({studio.reviewCount})
                    </span>
                  </span>
                </div>

                {/* Bottom Overlay: Hourly Rate Pill */}
                <div className="absolute right-3.5 bottom-3.5 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground shadow-sm">
                  ${studio.hourlyRate}{" "}
                  <span className="font-normal opacity-90">/ hr</span>
                </div>
              </div>

              {/* Card Body */}
              <CardHeader className="space-y-2 px-5 pt-5 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0 text-primary" />
                  <span className="truncate">{studio.location}</span>
                </div>
                <CardTitle className="line-clamp-2 font-heading text-lg font-bold leading-snug text-foreground">
                  {studio.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 px-5 pb-4">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5">
                    <Maximize2 className="size-3.5 text-primary" />
                    {studio.sqft.toLocaleString()} sq.ft.
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Users className="size-3.5 text-primary" />
                    Up to {studio.capacity} crew
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {studio.amenities.slice(0, 2).map((amenity) => (
                    <span
                      key={amenity}
                      className="rounded-md bg-muted px-2.5 py-1 text-[11px] font-medium text-muted-foreground"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
              </CardContent>
            </div>

            {/* Card Footer with Consistent Button Style */}
            <CardFooter className="mt-auto flex items-center justify-between border-t border-border bg-muted/30 px-5 py-4">
              <div>
                <span className="text-xs text-muted-foreground">
                  Hourly Rate
                </span>
                <p className="font-heading text-base font-bold text-foreground">
                  ${studio.hourlyRate}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    / hr
                  </span>
                </p>
              </div>
              <Button
                variant="default"
                render={<Link href={`/studios?studio=${studio.slug}`} />}
                className="h-10 rounded-lg px-5 text-sm font-semibold shadow-sm"
              >
                View Details
                <ArrowRight className="ml-1.5 size-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}

