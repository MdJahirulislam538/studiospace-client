import { Suspense } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, Maximize2, Sparkles, Star, Users } from "lucide-react";
import { getAllStudios } from "@/lib/studios";
import type { StudioCategory } from "@/types/studio";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StudioCardGridSkeleton } from "@/components/studios/studio-skeletons";

const ALL_CATEGORIES: StudioCategory[] = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
];

interface StudiosPageProps {
  searchParams: Promise<{ category?: string; studio?: string }>;
}

async function StudiosGrid({ selectedCategory }: { selectedCategory: string }) {
  const allStudios = await getAllStudios();

  const filteredStudios =
    selectedCategory === "All"
      ? allStudios
      : allStudios.filter((s) => s.category === selectedCategory);

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {filteredStudios.map((studio) => (
        <Card
          key={studio._id}
          className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
        >
          <div>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
              <img
                src={studio.image}
                alt={studio.title}
                loading="lazy"
                width={640}
                height={400}
                className="size-full object-cover"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25"
              />
              <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                <Badge className="h-6 rounded-full bg-background/95 px-3 text-xs font-semibold text-foreground">
                  {studio.category}
                </Badge>
                <span className="inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-xs font-semibold text-white">
                  <Star className="size-3.5 fill-primary text-primary" />
                  {studio.rating.toFixed(2)} ({studio.reviewCount})
                </span>
              </div>
              <div className="absolute right-3.5 bottom-3.5 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                ${studio.hourlyRate} / hr
              </div>
            </div>

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
                {studio.amenities.map((amenity) => (
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
              render={<Link href={`/studios/${studio._id}`} />}
              className="h-10 rounded-lg px-5 text-sm font-semibold shadow-sm"
            >
              View Details
              <ArrowRight className="ml-1.5 size-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default async function StudiosPage({ searchParams }: StudiosPageProps) {
  const resolvedParams = await searchParams;
  const selectedCategory = resolvedParams.category || "All";

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col justify-between gap-6 border-b border-border pb-8 md:flex-row md:items-end">
        <div className="max-w-2xl space-y-3">
          <Badge
            variant="secondary"
            className="h-7 rounded-full px-3.5 text-xs font-semibold text-primary"
          >
            <Sparkles className="mr-1.5 size-3.5" />
            Explore Verified Production Spaces
          </Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {selectedCategory === "All"
              ? "All Creative & Production Studios"
              : selectedCategory}
          </h1>
          <p className="text-base leading-relaxed text-muted-foreground">
            Filter by studio category to inspect hourly rates, acoustic specs,
            square footage, and real-time slot availability.
          </p>
        </div>

        {/* Pre-selected Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={selectedCategory === "All" ? "default" : "outline"}
            render={<Link href="/studios" />}
            className="h-9 rounded-lg px-4 text-xs font-semibold"
          >
            All Studios
          </Button>
          {ALL_CATEGORIES.map((category) => {
            const active = selectedCategory === category;
            return (
              <Button
                key={category}
                variant={active ? "default" : "outline"}
                render={
                  <Link
                    href={`/studios?category=${encodeURIComponent(category)}`}
                  />
                }
                className="h-9 rounded-lg px-4 text-xs font-semibold"
              >
                {category}
              </Button>
            );
          })}
        </div>
      </div>

      {/* Suspense Boundary for Studio Grid */}
      <Suspense
        key={selectedCategory}
        fallback={<StudioCardGridSkeleton count={6} />}
      >
        <StudiosGrid selectedCategory={selectedCategory} />
      </Suspense>
    </section>
  );
}
