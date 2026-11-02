import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  Clock,
  DollarSign,
  Layers,
  Mail,
  MapPin,
  Maximize2,
  Pencil,
  ShieldCheck,
  Sparkles,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { getStudioById } from "@/lib/studios";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  StudioBookingWidget,
  StudioGalleryCarousel,
} from "@/components/studios/studio-details-client";
import { StudioDetailsSkeleton } from "@/components/studios/studio-skeletons";

interface StudioDetailsPageProps {
  params: Promise<{ id: string }>;
}

const STUDIO_REVIEWS = [
  {
    id: "rev-1",
    author: "Jordan Vance",
    role: "Director of Photography, A24 Commercial Unit",
    date: "October 2026",
    rating: 5.0,
    comment:
      "Immaculate production space. The power distribution and overhead lighting grid saved our grip team at least two hours during load-in, and the acoustic isolation held up even during heavy street traffic outside.",
  },
  {
    id: "rev-2",
    author: "Maya Lin-koster",
    role: "Executive Producer, Waveform Originals",
    date: "September 2026",
    rating: 4.95,
    comment:
      "Every piece of listed studio gear was pre-staged, tested, and ready at call time. Client lounge and hair/makeup vanity were spotless. Will definitely lock this room for our Q4 campaign.",
  },
  {
    id: "rev-3",
    author: "Rafael Mendez",
    role: "Creative Director & Fashion Photographer",
    date: "September 2026",
    rating: 4.98,
    comment:
      "The host was super responsive and accommodating with our equipment delivery window. Transparent hourly pricing with zero surprise overtime or power fees.",
  },
];

async function StudioDetailsContent({ id }: { id: string }) {
  const studio = await getStudioById(id);

  if (!studio) {
    notFound();
  }

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const currentUser = session?.user
    ? {
        name: session.user.name || "Creator",
        email: session.user.email,
      }
    : null;

  const isOwner =
    Boolean(currentUser?.email) &&
    Boolean(studio.hostEmail) &&
    currentUser?.email === studio.hostEmail;

  const deposit = studio.securityDeposit ?? 200;
  const hostName = studio.hostName || "Elena Vance (Verified Studio Host)";
  const hostEmail = studio.hostEmail || "host@studiospace.io";
  const hostInitials = hostName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <Button
          variant="ghost"
          size="sm"
          render={<Link href="/studios" />}
          className="h-9 rounded-lg px-3 text-xs font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1.5 size-4" />
          Back to All Studios
        </Button>

        <div className="flex flex-wrap items-center gap-2">
          {isOwner && (
            <Button
              variant="outline"
              size="sm"
              render={<Link href={`/edit-studio/${studio._id}`} />}
              className="h-9 rounded-lg px-3.5 text-xs font-semibold"
            >
              <Pencil className="mr-1.5 size-3.5" />
              Edit Listing
            </Button>
          )}
          <Badge
            variant="secondary"
            className="h-7 rounded-full px-3 text-xs font-semibold text-primary"
          >
            <ShieldCheck className="mr-1.5 size-3.5" />
            Verified Production Workspace
          </Badge>
        </div>
      </div>

      {/* Studio Title & Key Metadata Header */}
      <header className="mb-8 space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge className="h-6 rounded-full px-3 text-xs font-semibold">
            {studio.category}
          </Badge>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-semibold text-foreground">
            <Star className="size-3.5 fill-primary text-primary" />
            {studio.rating.toFixed(2)}{" "}
            <span className="font-normal text-muted-foreground">
              ({studio.reviewCount} verified reviews)
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground">
            <MapPin className="size-3.5 text-primary" />
            {studio.location}
          </span>
        </div>

        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
          {studio.title}
        </h1>
      </header>

      {/* Gallery Carousel */}
      <div className="mb-12">
        <StudioGalleryCarousel studio={studio} />
      </div>

      {/* Main Two-Column Content Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left Column: Specifications, Overview, Amenities, Host Details, Reviews */}
        <div className="space-y-10 lg:col-span-8">
          {/* 1. Full Workspace Specifications */}
          <section
            aria-labelledby="specs-heading"
            className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-xs sm:p-8"
          >
            <div className="space-y-1">
              <Badge
                variant="secondary"
                className="h-6 rounded-full px-3 text-[11px] font-semibold text-primary"
              >
                <Layers className="mr-1 size-3" />
                Technical Sheet
              </Badge>
              <h2
                id="specs-heading"
                className="font-heading text-2xl font-bold text-foreground"
              >
                Workspace Specifications
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <DollarSign className="size-4 text-primary" />
                  <span>Hourly Rate</span>
                </div>
                <p className="mt-1.5 font-heading text-xl font-bold text-foreground">
                  ${studio.hourlyRate}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    / hr
                  </span>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <ShieldCheck className="size-4 text-primary" />
                  <span>Security Deposit</span>
                </div>
                <p className="mt-1.5 font-heading text-xl font-bold text-foreground">
                  ${deposit}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    refundable
                  </span>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Maximize2 className="size-4 text-primary" />
                  <span>Floor Footprint</span>
                </div>
                <p className="mt-1.5 font-heading text-xl font-bold text-foreground">
                  {studio.sqft.toLocaleString()}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    sq.ft.
                  </span>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Users className="size-4 text-primary" />
                  <span>Max Crew Capacity</span>
                </div>
                <p className="mt-1.5 font-heading text-xl font-bold text-foreground">
                  Up to {studio.capacity}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    crew
                  </span>
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Zap className="size-4 text-primary" />
                  <span>Power &amp; Acoustic</span>
                </div>
                <p className="mt-1.5 font-heading text-base font-bold text-foreground">
                  Isolated / 3-Phase
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-muted/30 p-4">
                <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Clock className="size-4 text-primary" />
                  <span>Minimum Booking</span>
                </div>
                <p className="mt-1.5 font-heading text-base font-bold text-foreground">
                  2 Hours Minimum
                </p>
              </div>
            </div>

            {/* Detailed Studio Overview */}
            <div className="space-y-2.5 border-t border-border pt-5">
              <h3 className="font-heading text-lg font-bold text-foreground">
                Detailed Studio Overview
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                {studio.overview ||
                  `${studio.title} is a turn-key ${studio.category.toLowerCase()} space located in ${studio.location}. Spanning ${studio.sqft.toLocaleString()} sq.ft. and accommodating up to ${studio.capacity} crew members, this studio is engineered for seamless commercial shoots, broadcast production, and creative sessions with pre-rigged lighting and acoustic isolation.`}
              </p>
            </div>
          </section>

          {/* 2. Amenity List */}
          <section
            aria-labelledby="amenities-heading"
            className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-xs sm:p-8"
          >
            <div className="space-y-1">
              <Badge
                variant="secondary"
                className="h-6 rounded-full px-3 text-[11px] font-semibold text-primary"
              >
                <Sparkles className="mr-1 size-3" />
                Included Production Package
              </Badge>
              <h2
                id="amenities-heading"
                className="font-heading text-2xl font-bold text-foreground"
              >
                Studio Amenities &amp; Equipment List
              </h2>
              <p className="text-sm text-muted-foreground">
                All listed gear and facility features are inspected before call
                time and included in your hourly rate.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {studio.amenities.map((amenity) => (
                <div
                  key={amenity}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-muted/25 px-4 py-3.5 text-sm font-medium text-foreground"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <CheckCircle2 className="size-4" />
                  </span>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </section>

          {/* 3. Host Details */}
          <section
            aria-labelledby="host-heading"
            className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-xs sm:p-8"
          >
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary text-lg font-bold text-primary-foreground shadow-sm">
                  {hostInitials}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2
                      id="host-heading"
                      className="font-heading text-xl font-bold text-foreground"
                    >
                      Hosted by {hostName}
                    </h2>
                    <Badge className="h-5 rounded-full px-2.5 text-[10px] font-semibold">
                      <Award className="mr-1 size-3" />
                      Verified Studio Host
                    </Badge>
                  </div>
                  <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Mail className="size-3.5 text-primary" />
                    <span>{hostEmail}</span>
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs">
                <div className="rounded-xl border border-border bg-muted/30 px-3.5 py-2">
                  <span className="block text-muted-foreground">
                    Response Rate
                  </span>
                  <span className="font-heading text-sm font-bold text-foreground">
                    99.4%
                  </span>
                </div>
                <div className="rounded-xl border border-border bg-muted/30 px-3.5 py-2">
                  <span className="block text-muted-foreground">
                    Avg. Response
                  </span>
                  <span className="font-heading text-sm font-bold text-foreground">
                    &lt; 15 mins
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-muted-foreground">
              <p className="font-semibold text-foreground">
                On-Site Studio Manager &amp; Technical Check-In Included
              </p>
              <p className="mt-1">
                Every booking with {hostName} includes a 15-minute pre-shoot
                walkthrough covering lighting grid controls, breaker tie-ins,
                acoustic doors, and high-speed fiber credentials.
              </p>
            </div>
          </section>

          {/* 4. Verified Creator & Crew Reviews */}
          <section
            aria-labelledby="reviews-heading"
            className="space-y-6 rounded-3xl border border-border bg-card p-6 shadow-xs sm:p-8"
          >
            <div className="flex flex-col justify-between gap-4 border-b border-border pb-6 sm:flex-row sm:items-end">
              <div className="space-y-1">
                <Badge
                  variant="secondary"
                  className="h-6 rounded-full px-3 text-[11px] font-semibold text-primary"
                >
                  <Star className="mr-1 size-3 fill-primary text-primary" />
                  Production Feedback
                </Badge>
                <h2
                  id="reviews-heading"
                  className="font-heading text-2xl font-bold text-foreground"
                >
                  Creator &amp; Crew Reviews ({studio.reviewCount})
                </h2>
              </div>

              <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-muted/40 px-4 py-2.5">
                <Star className="size-5 fill-primary text-primary" />
                <span className="font-heading text-2xl font-bold text-foreground">
                  {studio.rating.toFixed(2)}
                </span>
                <span className="text-xs text-muted-foreground">
                  out of 5.0
                </span>
              </div>
            </div>

            {/* Sub-ratings breakdown */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { label: "Acoustic & Light Spec", score: "4.98" },
                { label: "Equipment Condition", score: "4.96" },
                { label: "Load-In & Freight", score: "4.94" },
                { label: "Host Communication", score: "5.00" },
              ].map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-border bg-muted/25 p-3.5"
                >
                  <span className="text-xs text-muted-foreground">
                    {metric.label}
                  </span>
                  <p className="mt-1 flex items-center gap-1 font-heading text-base font-bold text-foreground">
                    <Star className="size-3.5 fill-primary text-primary" />
                    {metric.score}
                  </p>
                </div>
              ))}
            </div>

            {/* Individual Review Cards */}
            <div className="space-y-4">
              {STUDIO_REVIEWS.map((review) => (
                <Card
                  key={review.id}
                  className="rounded-2xl border border-border bg-muted/20 p-5 shadow-none"
                >
                  <CardHeader className="flex flex-row items-start justify-between gap-3 px-0 pt-0 pb-3">
                    <div>
                      <CardTitle className="font-heading text-sm font-bold text-foreground">
                        {review.author}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">
                        {review.role} • {review.date}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-foreground shadow-2xs">
                      <Star className="size-3 fill-primary text-primary" />
                      {review.rating.toFixed(2)}
                    </span>
                  </CardHeader>
                  <CardContent className="px-0 pb-0">
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: Sticky Booking Summary & Modal Trigger */}
        <div className="lg:col-span-4">
          <StudioBookingWidget studio={studio} currentUser={currentUser} />
        </div>
      </div>
    </article>
  );
}

export default async function StudioDetailsPage({
  params,
}: StudioDetailsPageProps) {
  const { id } = await params;

  return (
    <Suspense fallback={<StudioDetailsSkeleton />}>
      <StudioDetailsContent id={id} />
    </Suspense>
  );
}

