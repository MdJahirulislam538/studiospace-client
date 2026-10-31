"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  ShieldCheck,
  Sparkles,
  Star,
} from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSlide {
  id: string;
  tag: string;
  headline: string;
  subtext: string;
  studioName: string;
  location: string;
  hourlyRate: number;
  rating: string;
  specs: string[];
  image: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: "slide-cyc-loft",
    tag: "Daylight & Cyc Wall Studios",
    headline: "Shoot Commercials & Editorial Campaigns Without Compromise",
    subtext:
      "Book architectural daylight lofts and pre-lit 28ft seamless cyclorama walls equipped with Profoto strobe packages, grip carts, and private client lounges.",
    studioName: "Aperture 09 Daylight & Cyc Loft",
    location: "SoHo, New York",
    hourlyRate: 95,
    rating: "4.96 (142 reviews)",
    specs: ["2,400 sq.ft.", "28ft Corner Cyc", "Profoto Pro-11 Included"],
    image:
      "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "slide-sound-stage",
    tag: "Cinema Sound Stages & XR Volumes",
    headline: "Acoustically Isolated Stages Built for Narrative & XR Film",
    subtext:
      "Reserve NC-20 soundproof stages featuring motorized lighting grids, 400A 3-phase power distribution, and drive-in elephant doors with zero hidden fees.",
    studioName: "Stage K — NC-20 Cinema & XR Volume",
    location: "Arts District, Los Angeles",
    hourlyRate: 240,
    rating: "4.98 (89 reviews)",
    specs: ["6,800 sq.ft.", "400A 3-Phase Power", "18ft Grid Height"],
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "slide-podcast-suite",
    tag: "Broadcast Podcast & Video Lounges",
    headline: "Walk In, Sit Down, and Record Multi-Cam 4K Shows Instantly",
    subtext:
      "Turnkey podcast production lounges pre-wired with Shure SM7dB vocal chains, Sony Cinema Line cameras, and customizable RGB set backdrops.",
    studioName: "VoxHouse 4-Mic Video Podcast Lounge",
    location: "East Austin, Texas",
    hourlyRate: 75,
    rating: "4.94 (215 reviews)",
    specs: ["4x Shure SM7dB", "3-Cam Sony FX3", "On-Site Audio Engineer"],
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1800&q=85",
  },
  {
    id: "slide-music-suite",
    tag: "Music Recording & Dolby Atmos Suites",
    headline: "Track, Mix & Master in World-Class Acoustic Environments",
    subtext:
      "From analog SSL tracking rooms with isolated live booths to calibrated 7.1.4 Dolby Atmos mixing suites—available by the hour or full lock-out.",
    studioName: "Obsidian Room A — SSL & Atmos Suite",
    location: "Music Row, Nashville",
    hourlyRate: 130,
    rating: "4.97 (164 reviews)",
    specs: ["7.1.4 Genelec Atmos", "SSL Origin 32-Ch", "Steinway B Live Booth"],
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1800&q=85",
  },
];

export function HeroSlider() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

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

  React.useEffect(() => {
    if (!api || isPaused) return;
    const timer = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext();
      } else {
        api.scrollTo(0);
      }
    }, 6000);
    return () => window.clearInterval(timer);
  }, [api, isPaused]);

  return (
    <section
      aria-label="Featured Creative Studios Hero Slider"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden border-b border-border bg-foreground text-background"
    >
      <Carousel
        setApi={setApi}
        opts={{ loop: true, align: "start" }}
        className="w-full"
      >
        <CarouselContent className="ml-0">
          {HERO_SLIDES.map((slide, index) => (
            <CarouselItem key={slide.id} className="pl-0">
              <div className="relative min-h-[580px] w-full sm:min-h-[640px] lg:min-h-[680px]">
                {/* Uniform Hero Slide Background Image */}
                <img
                  src={slide.image}
                  alt={slide.studioName}
                  fetchPriority={index === 0 ? "high" : "low"}
                  loading={index === 0 ? undefined : "lazy"}
                  width={1800}
                  height={1000}
                  className="absolute inset-0 size-full object-cover object-center"
                />
                {/* Editorial Dark Studio Gradient Overlay */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/35"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30"
                />

                {/* Slide Content Container */}
                <div className="relative z-10 mx-auto flex min-h-[580px] max-w-7xl flex-col justify-between px-4 py-14 sm:min-h-[640px] sm:px-6 sm:py-16 lg:min-h-[680px] lg:px-8 lg:py-20">
                  <div className="max-w-3xl space-y-6">
                    {/* Eyebrow Badge */}
                    <div className="flex flex-wrap items-center gap-2.5">
                      <Badge className="h-7 rounded-full bg-primary px-3.5 text-xs font-semibold text-primary-foreground shadow-sm">
                        <Sparkles className="mr-1.5 size-3.5" />
                        {slide.tag}
                      </Badge>
                      <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-md">
                        <ShieldCheck className="size-3.5 text-primary" />
                        Instant Hourly Booking
                      </span>
                    </div>

                    {/* Main Headline — Consistent Heading Style */}
                    <h1 className="font-heading text-3xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.1]">
                      {slide.headline}
                    </h1>

                    {/* Balanced Subtext */}
                    <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                      {slide.subtext}
                    </p>

                    {/* Studio Spec Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {slide.specs.map((spec) => (
                        <span
                          key={spec}
                          className="rounded-lg border border-white/15 bg-black/40 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-xs"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>

                    {/* Primary CTA Buttons linking to /studios */}
                    <div className="flex flex-wrap items-center gap-3.5 pt-3">
                      <Button
                        variant="default"
                        render={<Link href="/studios" />}
                        className="h-11 rounded-lg px-6 text-sm font-semibold shadow-md"
                      >
                        Explore Studios
                        <ArrowRight className="ml-2 size-4" />
                      </Button>
                      <Button
                        variant="outline"
                        render={<Link href="/studios" />}
                        className="h-11 rounded-lg border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-md hover:bg-white hover:text-black"
                      >
                        Host Your Space
                      </Button>
                    </div>
                  </div>

                  {/* Bottom Studio Spotlight Card & Slide Controls */}
                  <div className="mt-10 flex flex-col justify-between gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end">
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/90">
                      <div>
                        <p className="text-xs font-medium tracking-wider text-white/60 uppercase">
                          Featured Space on Set
                        </p>
                        <p className="font-heading text-base font-semibold text-white">
                          {slide.studioName}
                        </p>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/80">
                        <MapPin className="size-3.5 text-primary" />
                        <span>{slide.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/80">
                        <Star className="size-3.5 fill-primary text-primary" />
                        <span>{slide.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5 rounded-lg bg-primary/20 px-2.5 py-1 text-xs font-semibold text-white ring-1 ring-primary/40">
                        <Clock className="size-3.5 text-primary" />
                        <span>${slide.hourlyRate} / hr</span>
                      </div>
                    </div>

                    {/* Slide Pagination Dots & Prev/Next Buttons */}
                    <div className="flex items-center gap-3">
                      <div
                        role="tablist"
                        aria-label="Select hero slide"
                        className="flex items-center gap-2"
                      >
                        {HERO_SLIDES.map((s, idx) => (
                          <button
                            key={s.id}
                            type="button"
                            role="tab"
                            aria-selected={current === idx}
                            aria-label={`Go to slide ${idx + 1}: ${s.tag}`}
                            onClick={() => api?.scrollTo(idx)}
                            className={`h-2 rounded-full transition-all ${
                              current === idx
                                ? "w-8 bg-primary"
                                : "w-2 bg-white/40 hover:bg-white/70"
                            }`}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-1.5 pl-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label="Previous slide"
                          onClick={() =>
                            api?.canScrollPrev()
                              ? api.scrollPrev()
                              : api?.scrollTo(HERO_SLIDES.length - 1)
                          }
                          className="size-9 rounded-lg border-white/25 bg-black/40 text-white hover:bg-white hover:text-black"
                        >
                          <ChevronLeft className="size-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          aria-label="Next slide"
                          onClick={() =>
                            api?.canScrollNext()
                              ? api.scrollNext()
                              : api?.scrollTo(0)
                          }
                          className="size-9 rounded-lg border-white/25 bg-black/40 text-white hover:bg-white hover:text-black"
                        >
                          <ChevronRight className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
}

