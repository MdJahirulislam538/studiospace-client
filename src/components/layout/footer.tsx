"use client";

import * as React from "react";
import Link from "next/link";
import { Aperture, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function XBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3v6Z" />
    </svg>
  );
}

function LinkedinBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
  { label: "Host Your Space", href: "/studios" },
] as const;

const STUDIO_CATEGORIES = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Rooms",
  "Music Suites",
  "Art Workshops",
] as const;

export function Footer() {
  const [email, setEmail] = React.useState("");
  const [subscribed, setSubscribed] = React.useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-card text-card-foreground">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand, Mission Statement & Socials */}
          <div className="flex flex-col justify-between space-y-6 lg:col-span-4">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                  <Aperture className="size-5.5" aria-hidden="true" />
                </span>
                <span className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  Studio<span className="text-primary">Space</span>
                </span>
              </Link>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                StudioSpace is a high-performance peer-to-peer marketplace
                empowering filmmakers, photographers, podcasters, and musicians
                to discover, inspect, and reserve world-class production studios
                with transparent hourly pricing.
              </p>
            </div>

            {/* Social Links featuring the new X logo */}
            <div className="flex items-center gap-3">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow StudioSpace on X"
                className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <XBrandIcon className="size-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow StudioSpace on Instagram"
                className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <InstagramBrandIcon className="size-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Subscribe to StudioSpace on YouTube"
                className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <YoutubeBrandIcon className="size-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Connect with StudioSpace on LinkedIn"
                className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:bg-primary hover:text-primary-foreground"
              >
                <LinkedinBrandIcon className="size-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation Links */}
          <div className="space-y-4 lg:col-span-2">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Popular Studio Categories */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Studio Categories
            </h3>
            <ul className="space-y-2.5 text-sm">
              {STUDIO_CATEGORIES.map((category) => (
                <li key={category}>
                  <Link
                    href={`/studios?category=${encodeURIComponent(category)}`}
                    className="text-muted-foreground transition-colors hover:text-primary"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter Input */}
          <div className="space-y-4 lg:col-span-3">
            <h3 className="font-heading text-sm font-semibold tracking-wider text-foreground uppercase">
              Creator Dispatch
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Get weekly drops on newly verified sound stages, daylight lofts,
              and exclusive off-peak shoot discounts.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2.5">
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@production.studio"
                  aria-label="Email address for newsletter"
                  className="h-10 rounded-lg bg-background px-3.5 text-sm"
                />
                <Button
                  type="submit"
                  variant="default"
                  className="h-10 w-full rounded-lg px-5 text-sm font-semibold shadow-sm"
                >
                  Subscribe
                  <ArrowRight className="ml-1.5 size-4" />
                </Button>
              </div>
              {subscribed && (
                <p className="flex items-center gap-1.5 text-xs font-medium text-primary">
                  <CheckCircle2 className="size-3.5" />
                  You&apos;re on the list for studio drops!
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Copyright & Terms Notice */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row">
          <p>
            &copy; {new Date().getFullYear()} StudioSpace Inc. All rights
            reserved. Built for creators &amp; studio hosts.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/#about-us" className="hover:text-foreground">
              Terms of Service
            </Link>
            <Link href="/#about-us" className="hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/#about-us" className="hover:text-foreground">
              Host Liability Guarantee
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
