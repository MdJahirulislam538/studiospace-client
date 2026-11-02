import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CalendarCheck2, PlusCircle, Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StudioCardGridSkeleton } from "@/components/studios/studio-skeletons";
import {
  MyBookingsClient,
  type BookingItem,
  type BookingStatus,
} from "@/components/bookings/my-bookings-client";

function normalizeStatus(raw: unknown): BookingStatus {
  const val = String(raw || "Pending");
  if (
    val === "Pending" ||
    val === "Confirmed" ||
    val === "Completed" ||
    val === "Cancelled"
  ) {
    return val;
  }
  return "Pending";
}

async function MyBookingsContent({ userEmail }: { userEmail: string }) {
  let bookings: BookingItem[] = [];

  try {
    const docs = await db
      .collection("bookings")
      .find({ userEmail })
      .sort({ createdAt: -1 })
      .toArray();

    bookings = docs.map((doc) => ({
      _id: String(doc._id),
      studioId: String(doc.studioId || "studio-01"),
      studioTitle: String(doc.studioTitle || "Production Studio"),
      studioCategory: String(doc.studioCategory || "Photo Studios"),
      studioImage: String(
        doc.studioImage ||
          "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&fit=crop&w=900&q=80"
      ),
      studioLocation: String(doc.studioLocation || "New York, NY"),
      hourlyRate: Number(doc.hourlyRate ?? 95),
      securityDeposit: Number(doc.securityDeposit ?? 200),
      shootDate: String(doc.shootDate || "2026-11-10"),
      startTime: String(doc.startTime || "10:00 AM"),
      hours: Number(doc.hours ?? 4),
      crewSize: Number(doc.crewSize ?? 8),
      totalAmount: Number(doc.totalAmount ?? 580),
      userName: String(doc.userName || "Creator"),
      userEmail: String(doc.userEmail || userEmail),
      hostName: String(doc.hostName || "Verified Studio Host"),
      projectNotes: String(doc.projectNotes || ""),
      status: normalizeStatus(doc.status),
      createdAt: String(doc.createdAt || ""),
    }));
  } catch {
    bookings = [];
  }

  return <MyBookingsClient initialBookings={bookings} />;
}

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callbackUrl=/my-bookings");
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
        <div className="space-y-2.5">
          <Badge
            variant="secondary"
            className="h-7 rounded-full px-3.5 text-xs font-semibold text-primary"
          >
            <CalendarCheck2 className="mr-1.5 size-3.5" />
            Creator Reservation Portal — Private Route
          </Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Studio Bookings
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Track your studio reservations, session schedules, status badges (
            <span className="font-medium text-foreground">
              Pending, Confirmed, Completed, Cancelled
            </span>
            ), and manage pending slots under{" "}
            <span className="font-semibold text-foreground">
              {session.user.email}
            </span>
            .
          </p>
        </div>

        <Button
          variant="default"
          render={<Link href="/studios" />}
          className="h-10 rounded-lg px-5 text-sm font-semibold shadow-sm"
        >
          <Sparkles className="mr-2 size-4" />
          Book Another Studio
        </Button>
      </div>

      <Suspense fallback={<StudioCardGridSkeleton count={3} />}>
        <MyBookingsContent userEmail={session.user.email} />
      </Suspense>
    </section>
  );
}

