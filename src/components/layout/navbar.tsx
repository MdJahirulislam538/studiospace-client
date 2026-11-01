"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Aperture,
  CalendarCheck2,
  ChevronDown,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  PlusCircle,
  Sparkles,
  UserCheck,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Explore Studios", href: "/studios" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "About Us", href: "/#about-us" },
] as const;

// interface DemoUser {
//   name: string;
//   email: string;
//   image: string;
// }

// const DEMO_HOST_USER: DemoUser = {
//   name: "Aria Vance",
//   email: "aria@studiospace.io",
//   image:
//     "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
// };

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const activeUser = session?.user
    ? {
        name: session.user.name || "Studio Creator",
        email: session.user.email || "",
        image:
          session.user.image ||
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80",
      }
    : null;

  const isRouteActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const handleLogout = async () => {
    await authClient.signOut();
    router.refresh();
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo — Consistent font & scale with main section headings */}
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none"
        >
          <span className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
            <Aperture className="size-5.5" aria-hidden="true" />
          </span>
          <div className="flex flex-col">
            <span className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Studio<span className="text-primary">Space</span>
            </span>
            <span className="hidden text-[10px] font-medium tracking-widest text-muted-foreground uppercase sm:block">
              Creative Production Network
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links with Active Route Indicators */}
        <nav
          aria-label="Main Navigation"
          className="hidden items-center gap-1 md:flex"
        >
          {NAV_LINKS.map((link) => {
            const active = isRouteActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`relative rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary/10 text-primary font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {link.label}
                {active && (
                  <span
                    aria-hidden="true"
                    className=" inset-x-3 -bottom-[19px] absolute h-0.5 rounded-full bg-primary"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Actions: Unauthenticated vs Authenticated State */}
        <div className="hidden items-center gap-3 md:flex">
          {!activeUser ? (
            <>
              <Button
                variant="outline"
                render={<Link href="/login" />}
                className="h-10 rounded-lg px-5 text-sm font-semibold"
              >
                Login
              </Button>
              <Button
                variant="default"
                render={<Link href="/signup" />}
                className="h-10 rounded-lg px-5 text-sm font-semibold shadow-sm"
              >
                Register
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger
                openOnHover
                delay={120}
                className="group flex cursor-pointer items-center gap-2.5 rounded-full border border-border bg-card py-1.5 pr-3.5 pl-1.5 text-left shadow-xs transition-all hover:border-primary/50 hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
              >
                <Avatar size="default" className="size-8 ring-2 ring-primary/20">
                  <AvatarImage src={activeUser.image} alt={activeUser.name} />
                  <AvatarFallback>{getInitials(activeUser.name)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold leading-tight text-foreground">
                    {activeUser.name}
                  </span>
                  <span className="text-[11px] leading-tight text-muted-foreground">
                    Verified Host
                  </span>
                </div>
                <ChevronDown className="size-4 text-muted-foreground transition-transform duration-200 group-data-popup-open:rotate-180" />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="end"
                sideOffset={8}
                className="w-60 rounded-xl p-1.5 shadow-lg"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="px-2.5 py-2">
                    <p className="text-sm font-semibold text-foreground">
                      {activeUser.name}
                    </p>
                    {activeUser.email && (
                      <p className="truncate text-xs font-normal text-muted-foreground">
                        {activeUser.email}
                      </p>
                    )}
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    render={<Link href="/dashboard" />}
                    className="cursor-pointer rounded-lg px-2.5 py-2 text-sm font-medium"
                  >
                    <LayoutDashboard className="size-4 text-primary" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<Link href="/add-studio" />}
                    className="cursor-pointer rounded-lg px-2.5 py-2 text-sm font-medium"
                  >
                    <PlusCircle className="size-4 text-primary" />
                    Add New Studio
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<Link href="/my-listings" />}
                    className="cursor-pointer rounded-lg px-2.5 py-2 text-sm font-medium"
                  >
                    <Layers className="size-4 text-primary" />
                    My Studio Listings
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    render={<Link href="/my-bookings" />}
                    className="cursor-pointer rounded-lg px-2.5 py-2 text-sm font-medium"
                  >
                    <CalendarCheck2 className="size-4 text-primary" />
                    My Bookings
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={handleLogout}
                  className="cursor-pointer rounded-lg px-2.5 py-2 text-sm font-medium"
                >
                  <LogOut className="size-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Mobile Menu Trigger & Drawer */}
        <div className="flex items-center gap-2 md:hidden">
          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="size-10 rounded-lg"
                  aria-label="Open navigation menu"
                />
              }
            >
              <Menu className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="flex w-80 flex-col p-6">
              <SheetHeader className="p-0 pb-4 text-left">
                <SheetTitle className="flex items-center gap-2.5 font-heading text-xl font-bold tracking-tight">
                  <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Aperture className="size-5" />
                  </span>
                  <span>
                    Studio<span className="text-primary">Space</span>
                  </span>
                </SheetTitle>
              </SheetHeader>

              <nav
                aria-label="Mobile Navigation"
                className="flex flex-col gap-1.5 border-t border-border pt-4"
              >
                {NAV_LINKS.map((link) => {
                  const active = isRouteActive(link.href);
                  return (
                    <SheetClose
                      key={link.href}
                      render={
                        <Link
                          href={link.href}
                          className={`flex items-center justify-between rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors ${
                            active
                              ? "bg-primary/10 text-primary font-semibold"
                              : "text-foreground hover:bg-muted"
                          }`}
                        />
                      }
                    >
                      <span>{link.label}</span>
                      {active && (
                        <Sparkles className="size-4 text-primary" aria-hidden="true" />
                      )}
                    </SheetClose>
                  );
                })}
              </nav>

              <div className="mt-auto border-t border-border pt-5">
                {!activeUser ? (
                  <div className="flex flex-col gap-2.5">
                    <SheetClose
                      render={
                        <Button
                          variant="outline"
                          render={<Link href="/login" />}
                          className="h-10 w-full rounded-lg font-semibold"
                        />
                      }
                    >
                      Login
                    </SheetClose>
                    <SheetClose
                      render={
                        <Button
                          variant="default"
                          render={<Link href="/signup" />}
                          className="h-10 w-full rounded-lg font-semibold"
                        />
                      }
                    >
                      Register
                    </SheetClose>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 rounded-xl bg-muted/60 p-3">
                      <Avatar className="size-10">
                        <AvatarImage src={activeUser.image} alt={activeUser.name} />
                        <AvatarFallback>
                          {getInitials(activeUser.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {activeUser.name}
                        </p>
                        <p className="truncate text-xs text-muted-foreground">
                          {activeUser.email}
                        </p>
                      </div>
                    </div>
                    <div className="grid gap-1">
                      <SheetClose
                        render={
                          <Link
                            href="/dashboard"
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                          />
                        }
                      >
                        <LayoutDashboard className="size-4 text-primary" />
                        Dashboard
                      </SheetClose>
                      <SheetClose
                        render={
                          <Link
                            href="/add-studio"
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                          />
                        }
                      >
                        <PlusCircle className="size-4 text-primary" />
                        Add New Studio
                      </SheetClose>
                      <SheetClose
                        render={
                          <Link
                            href="/my-listings"
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                          />
                        }
                      >
                        <Layers className="size-4 text-primary" />
                        My Studio Listings
                      </SheetClose>
                      <SheetClose
                        render={
                          <Link
                            href="/my-bookings"
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
                          />
                        }
                      >
                        <CalendarCheck2 className="size-4 text-primary" />
                        My Bookings
                      </SheetClose>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="h-10 w-full rounded-lg font-semibold"
                    >
                      <LogOut className="mr-2 size-4" />
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

