"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ArrowRight,
  Calendar,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  FileText,
  Loader2,
  Lock,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Users,
  X,
} from "lucide-react";
import type { StudioItem } from "@/types/studio";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/toast";

interface GallerySlide {
  id: string;
  url: string;
  caption: string;
  tag: string;
}

function buildGallerySlides(studio: StudioItem): GallerySlide[] {
  return [
    {
      id: "main-stage",
      url:
        studio.image ||
        "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&fit=crop&w=1400&q=85",
      caption: `${studio.title} — Primary Production Floor (${studio.sqft.toLocaleString()} sq.ft.)`,
      tag: "Main Stage",
    },
    {
      id: "lighting-grid",
      url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1400&q=85",
      caption: "Overhead Lighting Grid, Grip Package & Acoustic Isolation Zone",
      tag: "Lighting & Grip Rig",
    },
    {
      id: "control-suite",
      url: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1400&q=85",
      caption: "Calibrated Monitoring & DIT Control Desk",
      tag: "Engineering & Control",
    },
    {
      id: "client-lounge",
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
      caption: "Private Client Green Room, Hair & Makeup Vanity & Prep Lounge",
      tag: "Client Green Room",
    },
  ];
}

export function StudioGalleryCarousel({ studio }: { studio: StudioItem }) {
  const slides = React.useMemo(() => buildGallerySlides(studio), [studio]);
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="space-y-3.5">
      <div className="relative overflow-hidden rounded-3xl border border-border bg-muted shadow-sm">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, align: "start" }}
          className="w-full"
        >
          <CarouselContent className="ml-0">
            {slides.map((slide, index) => (
              <CarouselItem key={slide.id} className="pl-0">
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted sm:aspect-[21/10]">
                  <img
                    src={slide.url}
                    alt={slide.caption}
                    fetchPriority={index === 0 ? "high" : "low"}
                    loading={index === 0 ? undefined : "lazy"}
                    width={1400}
                    height={750}
                    className="size-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/25"
                  />

                  {/* Top Badges */}
                  <div className="absolute inset-x-4 top-4 flex flex-wrap items-center justify-between gap-2 sm:inset-x-6 sm:top-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge className="h-7 rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-sm">
                        <Camera className="mr-1.5 size-3.5" />
                        {slide.tag}
                      </Badge>
                      <Badge className="h-7 rounded-full bg-black/70 px-3 text-xs font-semibold text-white backdrop-blur-md">
                        {studio.category}
                      </Badge>
                    </div>
                    <span className="rounded-full bg-black/75 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      {index + 1} / {slides.length}
                    </span>
                  </div>

                  {/* Bottom Caption & Prev/Next Controls */}
                  <div className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-4 sm:inset-x-6 sm:bottom-5">
                    <p className="line-clamp-1 text-xs font-medium text-white/95 sm:text-sm">
                      {slide.caption}
                    </p>
                    <div className="flex shrink-0 items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Previous studio photo"
                        onClick={() => api?.scrollPrev()}
                        className="size-9 rounded-lg border-white/25 bg-black/55 text-white hover:bg-white hover:text-black"
                      >
                        <ChevronLeft className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Next studio photo"
                        onClick={() => api?.scrollNext()}
                        className="size-9 rounded-lg border-white/25 bg-black/55 text-white hover:bg-white hover:text-black"
                      >
                        <ChevronRight className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* Thumbnail Strip */}
      <div
        role="tablist"
        aria-label="Studio gallery thumbnails"
        className="grid grid-cols-4 gap-2.5 sm:gap-3.5"
      >
        {slides.map((slide, idx) => {
          const active = current === idx;
          return (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={active}
              aria-label={`View photo ${idx + 1}: ${slide.tag}`}
              onClick={() => api?.scrollTo(idx)}
              className={`group relative aspect-[16/10] overflow-hidden rounded-xl border-2 transition-all ${
                active
                  ? "border-primary ring-2 ring-primary/30"
                  : "border-border opacity-75 hover:opacity-100"
              }`}
            >
              <img
                src={slide.url}
                alt={slide.tag}
                loading="lazy"
                width={320}
                height={200}
                className="size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent"
              />
              <span className="absolute inset-x-2 bottom-1.5 truncate text-left text-[11px] font-semibold text-white">
                {slide.tag}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface StudioBookingWidgetProps {
  studio: StudioItem;
  currentUser: {
    name: string;
    email: string;
  } | null;
}

const START_TIME_SLOTS = [
  "08:00 AM",
  "10:00 AM",
  "12:00 PM",
  "02:00 PM",
  "04:00 PM",
  "06:00 PM",
] as const;

export function StudioBookingWidget({
  studio,
  currentUser,
}: StudioBookingWidgetProps) {
  const router = useRouter();
  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const dialogId = React.useId();
  const dialogTitleId = `${dialogId}-title`;

  const defaultDate = React.useMemo(() => {
    const tomorrow = new Date(Date.now() + 86400000);
    return tomorrow.toISOString().split("T")[0];
  }, []);

  const [shootDate, setShootDate] = React.useState(defaultDate);
  const [startTime, setStartTime] = React.useState<string>("10:00 AM");
  const [hours, setHours] = React.useState<number>(4);
  const [crewSize, setCrewSize] = React.useState<string>(
    String(Math.min(8, studio.capacity || 10))
  );
  const [userName, setUserName] = React.useState(currentUser?.name || "");
  const [userEmail, setUserEmail] = React.useState(currentUser?.email || "");
  const [projectNotes, setProjectNotes] = React.useState("");

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [bookingError, setBookingError] = React.useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = React.useState(false);
  const [invalidFields, setInvalidFields] = React.useState<
    Record<string, boolean>
  >({});

  const deposit = studio.securityDeposit ?? 200;
  const subtotal = studio.hourlyRate * hours;
  const totalAmount = subtotal + deposit;

  // Fallback for <dialog closedby="any"> light dismiss in browsers lacking native closedBy support
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      dialog.returnValue = "";
    };
    dialog.addEventListener("close", handleClose);

    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const outside = (e: PointerEvent, el: HTMLDialogElement) => {
        const r = el.getBoundingClientRect();
        return (
          e.clientX < r.left ||
          e.clientX > r.right ||
          e.clientY < r.top ||
          e.clientY > r.bottom
        );
      };
      let pressedOutside = false;
      const onPointerDown = (e: PointerEvent) => {
        pressedOutside = outside(e, dialog);
      };
      const onPointerUp = (e: PointerEvent) => {
        if (pressedOutside && outside(e, dialog)) {
          dialog.close();
        }
      };
      dialog.addEventListener("pointerdown", onPointerDown);
      dialog.addEventListener("pointerup", onPointerUp);
      return () => {
        dialog.removeEventListener("close", handleClose);
        dialog.removeEventListener("pointerdown", onPointerDown);
        dialog.removeEventListener("pointerup", onPointerUp);
      };
    }

    return () => {
      dialog.removeEventListener("close", handleClose);
    };
  }, []);

  const syncFieldValidity = (
    e: React.SyntheticEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.currentTarget;
    if (!target.name) return;
    setInvalidFields((prev) => ({
      ...prev,
      [target.name]: !target.validity.valid,
    }));
  };

  const openBookingModal = () => {
    setBookingError(null);
    setBookingConfirmed(false);
    dialogRef.current?.showModal();
  };

  const handleConfirmBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingError(null);

    if (!shootDate || !userName.trim() || !userEmail.trim()) {
      const msg =
        "Please provide your shoot date, full name, and contact email to complete your booking.";
      setBookingError(msg);
      toast.add({
        title: "Missing Booking Details",
        description: msg,
        type: "error",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
      const payload = {
        studioId: studio._id,
        studioTitle: studio.title,
        studioCategory: studio.category,
        studioImage: studio.image,
        studioLocation: studio.location,
        hourlyRate: studio.hourlyRate,
        securityDeposit: deposit,
        shootDate,
        startTime,
        hours,
        crewSize: Number(crewSize) || 1,
        totalAmount,
        userName: userName.trim(),
        userEmail: userEmail.trim(),
        hostName: studio.hostName || "Verified Studio Host",
        hostEmail: studio.hostEmail || "",
        projectNotes: projectNotes.trim(),
        status: "Pending",
        createdAt: new Date().toISOString(),
      };

      let saved = false;
      try {
        const response = await fetch(`${apiUrl}/bookings`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          saved = true;
        }
      } catch {
        // Fallback to Next.js API route if Express server is not running
      }

      if (!saved) {
        const fallbackResponse = await fetch("/api/bookings", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
        if (!fallbackResponse.ok) {
          throw new Error("Could not save booking to database.");
        }
      }

      setBookingConfirmed(true);
      toast.add({
        title: "Reservation Submitted (Pending)!",
        description: `${studio.title} is reserved for ${shootDate} at ${startTime} (${hours} hrs) with Pending status.`,
        type: "success",
      });
      router.refresh();
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Unable to complete booking right now. Please try again.";
      setBookingError(msg);
      toast.add({
        title: "Booking Failed",
        description: msg,
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Sticky Booking Card */}
      <Card className="sticky top-24 rounded-3xl border border-border bg-card p-6 shadow-md">
        <CardHeader className="space-y-3 border-b border-border px-0 pt-0 pb-5">
          <div className="flex items-baseline justify-between gap-2">
            <div>
              <span className="font-heading text-3xl font-bold text-foreground">
                ${studio.hourlyRate}
              </span>
              <span className="text-sm font-medium text-muted-foreground">
                {" "}
                / hour
              </span>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              <Star className="size-3.5 fill-primary text-primary" />
              {studio.rating.toFixed(2)} ({studio.reviewCount})
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1 text-foreground font-medium">
              <ShieldCheck className="size-3.5 text-primary" />
              Instant Book Available
            </span>
            <span>•</span>
            <span>Refundable Deposit: ${deposit}</span>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 px-0 py-5">
          {/* Quick Date & Duration Preview */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label
                htmlFor="quick-shoot-date"
                className="text-xs font-semibold text-muted-foreground"
              >
                Shoot Date
              </Label>
              <Input
                id="quick-shoot-date"
                type="date"
                min={defaultDate}
                value={shootDate}
                onChange={(e) => setShootDate(e.target.value)}
                className="h-10 rounded-lg text-xs"
              />
            </div>

            <div className="space-y-1.5">
              <Label
                htmlFor="quick-shoot-hours"
                className="text-xs font-semibold text-muted-foreground"
              >
                Session Duration
              </Label>
              <select
                id="quick-shoot-hours"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="flex h-10 w-full rounded-lg border border-input bg-transparent px-3 text-xs font-medium text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
              >
                {[2, 3, 4, 6, 8, 10, 12].map((hr) => (
                  <option
                    key={hr}
                    value={hr}
                    className="bg-popover text-popover-foreground"
                  >
                    {hr} Hours (${studio.hourlyRate * hr})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Transparent Pricing Summary */}
          <div className="space-y-2.5 rounded-2xl border border-border bg-muted/35 p-4 text-xs">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>
                ${studio.hourlyRate} × {hours} hours studio rental
              </span>
              <span className="font-semibold text-foreground">${subtotal}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Refundable Security Deposit</span>
              <span className="font-semibold text-foreground">${deposit}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Equipment &amp; Liability Protection</span>
              <span className="font-semibold text-primary">Included ($0)</span>
            </div>
            <div className="flex items-center justify-between border-t border-border pt-2.5 text-sm font-bold text-foreground">
              <span>Estimated Total</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          <Button
            type="button"
            variant="default"
            onClick={openBookingModal}
            className="h-12 w-full rounded-xl text-sm font-semibold shadow-sm"
          >
            <Sparkles className="mr-2 size-4" />
            Book Workspace Now
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </CardContent>

        <CardFooter className="flex-col items-start gap-2 border-t border-border bg-transparent px-0 pt-4 pb-0 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-4 shrink-0 text-primary" />
            <span>
              Backed by StudioSpace <strong>$1M Production Liability</strong>{" "}
              &amp; Verified Gear Guarantee.
            </span>
          </div>
        </CardFooter>
      </Card>

      {/* Native HTML <dialog> Booking Modal (follows modern-web-guidance `dialog` spec) */}
      <dialog
        ref={dialogRef}
        id={dialogId}
        aria-labelledby={dialogTitleId}
        {...({ closedby: "any" } as React.HTMLAttributes<HTMLDialogElement>)}
        className="m-auto w-full max-w-2xl rounded-3xl border border-border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-xs open:flex open:flex-col"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <div className="space-y-1">
            <Badge
              variant="secondary"
              className="h-6 rounded-full px-3 text-[11px] font-semibold text-primary"
            >
              <Sparkles className="mr-1 size-3" />
              Instant Workspace Reservation
            </Badge>
            <h2
              id={dialogTitleId}
              className="font-heading text-xl font-bold text-foreground sm:text-2xl"
            >
              Book {studio.title}
            </h2>
          </div>

          <form method="dialog">
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              value="cancel"
              aria-label="Close booking modal"
              className="size-9 rounded-full"
            >
              <X className="size-4" />
            </Button>
          </form>
        </div>

        <div className="max-h-[80vh] overflow-y-auto p-6">
          {/* Studio Mini Summary Banner */}
          <div className="mb-6 flex items-center gap-4 rounded-2xl border border-border bg-muted/40 p-3.5">
            <img
              src={studio.image}
              alt={studio.title}
              width={96}
              height={64}
              className="h-16 w-24 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="h-5 rounded-full px-2.5 text-[10px] font-semibold">
                  {studio.category}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="size-3 text-primary" />
                  <span className="truncate">{studio.location}</span>
                </span>
              </div>
              <p className="truncate font-heading text-sm font-bold text-foreground">
                {studio.title}
              </p>
              <p className="text-xs font-semibold text-primary">
                ${studio.hourlyRate} / hr • Deposit: ${deposit} • Max{" "}
                {studio.capacity} crew
              </p>
            </div>
          </div>

          {bookingConfirmed ? (
            <div className="space-y-6 py-4 text-center">
              <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary/15 text-primary">
                <CheckCircle2 className="size-8" />
              </div>
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-bold text-foreground">
                  Reservation Confirmed!
                </h3>
                <p className="mx-auto max-w-md text-sm leading-relaxed text-muted-foreground">
                  Your production slot at <strong>{studio.title}</strong> has
                  been scheduled for <strong>{shootDate}</strong> starting at{" "}
                  <strong>{startTime}</strong> ({hours} hours).
                </p>
              </div>

              <div className="mx-auto max-w-md space-y-2 rounded-2xl border border-border bg-muted/30 p-4 text-left text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Creator / Renter:</span>
                  <span className="font-semibold text-foreground">
                    {userName} ({userEmail})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Session Slot:</span>
                  <span className="font-semibold text-foreground">
                    {shootDate} • {startTime} ({hours} hrs)
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Crew Headcount:</span>
                  <span className="font-semibold text-foreground">
                    {crewSize} crew members
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reservation Status:</span>
                  <Badge className="h-5 rounded-full bg-amber-500/15 px-2.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                    Pending
                  </Badge>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-sm font-bold text-foreground">
                  <span>Total Reserved:</span>
                  <span className="text-primary">${totalAmount}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <Button
                  type="button"
                  variant="default"
                  render={<Link href="/my-bookings" />}
                  className="h-10 rounded-lg px-6 text-sm font-semibold shadow-sm"
                >
                  View My Bookings
                  <ArrowRight className="ml-1.5 size-4" />
                </Button>
                <form method="dialog">
                  <Button
                    type="submit"
                    variant="outline"
                    value="done"
                    className="h-10 rounded-lg px-5 text-sm font-semibold"
                  >
                    Close
                  </Button>
                </form>
              </div>
            </div>
          ) : (
            <>
              {bookingError && (
                <div
                  role="alert"
                  aria-live="polite"
                  className="mb-5 flex items-start gap-3 rounded-xl border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive"
                >
                  <AlertCircle
                    className="mt-0.5 size-4 shrink-0"
                    aria-hidden="true"
                  />
                  <div className="space-y-0.5">
                    <p className="font-semibold">Booking Validation Error</p>
                    <p className="text-xs leading-relaxed opacity-90">
                      {bookingError}
                    </p>
                  </div>
                </div>
              )}

              <form
                method="POST"
                onSubmit={handleConfirmBooking}
                className="space-y-6"
                noValidate
              >
                {/* Schedule & Crew Fieldset */}
                <fieldset className="space-y-4">
                  <legend className="font-heading text-sm font-bold text-foreground">
                    1. Select Shoot Date, Time &amp; Crew Size
                  </legend>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="modal-shoot-date"
                        className="text-xs font-medium text-foreground"
                      >
                        Shoot Date <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Calendar
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="modal-shoot-date"
                          name="shootDate"
                          type="date"
                          required
                          autoFocus
                          min={defaultDate}
                          value={shootDate}
                          onChange={(e) => {
                            setShootDate(e.target.value);
                            if (invalidFields.shootDate) syncFieldValidity(e);
                          }}
                          onBlur={syncFieldValidity}
                          className="h-10 rounded-lg pl-9 text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="modal-start-time"
                        className="text-xs font-medium text-foreground"
                      >
                        Call Time / Start Slot{" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Clock
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <select
                          id="modal-start-time"
                          name="startTime"
                          value={startTime}
                          onChange={(e) => setStartTime(e.target.value)}
                          className="flex h-10 w-full rounded-lg border border-input bg-transparent pr-3 pl-9 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                        >
                          {START_TIME_SLOTS.map((slot) => (
                            <option
                              key={slot}
                              value={slot}
                              className="bg-popover text-popover-foreground"
                            >
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="modal-hours"
                        className="text-xs font-medium text-foreground"
                      >
                        Duration (Hours){" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <DollarSign
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <select
                          id="modal-hours"
                          name="hours"
                          value={hours}
                          onChange={(e) => setHours(Number(e.target.value))}
                          className="flex h-10 w-full rounded-lg border border-input bg-transparent pr-3 pl-9 text-sm text-foreground outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                        >
                          {[2, 3, 4, 6, 8, 10, 12].map((hr) => (
                            <option
                              key={hr}
                              value={hr}
                              className="bg-popover text-popover-foreground"
                            >
                              {hr} Hours (${studio.hourlyRate * hr})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="modal-crew-size"
                        className="text-xs font-medium text-foreground"
                      >
                        Crew Size (Max {studio.capacity}){" "}
                        <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Users
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="modal-crew-size"
                          name="crewSize"
                          type="number"
                          min={1}
                          max={studio.capacity}
                          required
                          value={crewSize}
                          onChange={(e) => setCrewSize(e.target.value)}
                          className="h-10 rounded-lg pl-9 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>

                {/* Creator / Renter Contact Credentials */}
                <fieldset className="space-y-4 border-t border-border pt-4">
                  <legend className="flex items-center gap-2 font-heading text-sm font-bold text-foreground">
                    <span>2. Producer / Creator Details</span>
                    {currentUser && (
                      <Badge
                        variant="outline"
                        className="rounded-full border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-semibold text-primary"
                      >
                        <Lock className="mr-1 size-2.5" />
                        Verified Account
                      </Badge>
                    )}
                  </legend>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="modal-user-name"
                        className="text-xs font-medium text-foreground"
                      >
                        Full Name <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <User
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="modal-user-name"
                          name="userName"
                          type="text"
                          required
                          readOnly={Boolean(currentUser?.name)}
                          aria-invalid={
                            invalidFields.userName ? "true" : undefined
                          }
                          placeholder="Your full name"
                          value={userName}
                          onChange={(e) => {
                            setUserName(e.target.value);
                            if (invalidFields.userName) syncFieldValidity(e);
                          }}
                          onBlur={syncFieldValidity}
                          className={`h-10 rounded-lg pl-9 text-sm ${
                            currentUser?.name
                              ? "bg-muted/60 text-muted-foreground"
                              : ""
                          }`}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label
                        htmlFor="modal-user-email"
                        className="text-xs font-medium text-foreground"
                      >
                        Email Address <span className="text-destructive">*</span>
                      </Label>
                      <div className="relative">
                        <Mail
                          aria-hidden="true"
                          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          id="modal-user-email"
                          name="userEmail"
                          type="email"
                          required
                          autoCorrect="off"
                          autoCapitalize="off"
                          spellCheck={false}
                          readOnly={Boolean(currentUser?.email)}
                          aria-invalid={
                            invalidFields.userEmail ? "true" : undefined
                          }
                          placeholder="you@production.studio"
                          value={userEmail}
                          onChange={(e) => {
                            setUserEmail(e.target.value);
                            if (invalidFields.userEmail) syncFieldValidity(e);
                          }}
                          onBlur={syncFieldValidity}
                          className={`h-10 rounded-lg pl-9 text-sm ${
                            currentUser?.email
                              ? "bg-muted/60 text-muted-foreground"
                              : ""
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="modal-project-notes"
                      className="flex items-center gap-1.5 text-xs font-medium text-foreground"
                    >
                      <FileText
                        className="size-3.5 text-primary"
                        aria-hidden="true"
                      />
                      Shoot Brief &amp; Load-In Notes (Optional)
                    </Label>
                    <Textarea
                      id="modal-project-notes"
                      name="projectNotes"
                      rows={3}
                      placeholder="Share details about your shoot (e.g., commercial lookbook, 3-cam podcast, grip truck arrival time, or special power requirements)..."
                      value={projectNotes}
                      onChange={(e) => setProjectNotes(e.target.value)}
                      className="rounded-xl p-3 text-sm"
                    />
                  </div>
                </fieldset>

                {/* Live Cost Breakdown */}
                <div className="space-y-2 rounded-2xl border border-border bg-muted/40 p-4 text-xs">
                  <div className="flex justify-between text-muted-foreground">
                    <span>
                      Studio Rental (${studio.hourlyRate}/hr × {hours} hrs)
                    </span>
                    <span className="font-semibold text-foreground">
                      ${subtotal}
                    </span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Refundable Security Deposit</span>
                    <span className="font-semibold text-foreground">
                      ${deposit}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-border pt-2 text-sm font-bold text-foreground">
                    <span>Total Due Upon Confirmation</span>
                    <span className="text-primary">${totalAmount}</span>
                  </div>
                </div>

                {/* Modal Action Buttons */}
                <div className="flex flex-col-reverse items-center justify-end gap-3 border-t border-border pt-4 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => dialogRef.current?.close("cancel")}
                    className="h-11 w-full rounded-lg px-5 text-sm font-semibold sm:w-auto"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    disabled={isSubmitting}
                    className="h-11 w-full rounded-lg px-7 text-sm font-semibold shadow-sm sm:w-auto"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Confirming Reservation...
                      </>
                    ) : (
                      <>
                        Confirm &amp; Reserve (${totalAmount})
                        <ArrowRight className="ml-2 size-4" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </>
          )}
        </div>
      </dialog>
    </>
  );
}

