"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertTriangle,
  ArrowRight,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  ExternalLink,
  Loader2,
  MapPin,
  Sparkles,
  Users,
  X,
  XCircle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "@/components/ui/toast";

export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";

export interface BookingItem {
  _id: string;
  studioId: string;
  studioTitle: string;
  studioCategory: string;
  studioImage: string;
  studioLocation: string;
  hourlyRate: number;
  securityDeposit: number;
  shootDate: string;
  startTime: string;
  hours: number;
  crewSize: number;
  totalAmount: number;
  userName: string;
  userEmail: string;
  hostName?: string;
  projectNotes?: string;
  status: BookingStatus;
  createdAt?: string;
}

const STATUS_FILTERS: Array<"All" | BookingStatus> = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
];

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  switch (status) {
    case "Pending":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/15 px-3 py-1 text-xs font-semibold text-amber-700 dark:text-amber-300">
          <Clock className="size-3.5" aria-hidden="true" />
          Pending
        </span>
      );
    case "Confirmed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
          <CheckCircle2 className="size-3.5" aria-hidden="true" />
          Confirmed
        </span>
      );
    case "Completed":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-sky-500/30 bg-sky-500/15 px-3 py-1 text-xs font-semibold text-sky-700 dark:text-sky-300">
          <Award className="size-3.5" aria-hidden="true" />
          Completed
        </span>
      );
    case "Cancelled":
      return (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-destructive/30 bg-destructive/15 px-3 py-1 text-xs font-semibold text-destructive">
          <XCircle className="size-3.5" aria-hidden="true" />
          Cancelled
        </span>
      );
  }
}

interface MyBookingsClientProps {
  initialBookings: BookingItem[];
}

export function MyBookingsClient({ initialBookings }: MyBookingsClientProps) {
  const router = useRouter();
  const [bookings, setBookings] = React.useState<BookingItem[]>(initialBookings);
  const [selectedFilter, setSelectedFilter] = React.useState<
    "All" | BookingStatus
  >("All");
  const [cancellingId, setCancellingId] = React.useState<string | null>(null);
  const [targetBooking, setTargetBooking] = React.useState<BookingItem | null>(
    null
  );

  const confirmDialogRef = React.useRef<HTMLDialogElement>(null);
  const confirmDialogId = React.useId();
  const confirmTitleId = `${confirmDialogId}-title`;

  React.useEffect(() => {
    setBookings(initialBookings);
  }, [initialBookings]);

  // Native <dialog closedby="any"> light-dismiss fallback & returnValue reset
  React.useEffect(() => {
    const dialog = confirmDialogRef.current;
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

  const promptCancelBooking = (booking: BookingItem) => {
    setTargetBooking(booking);
    confirmDialogRef.current?.showModal();
  };

  const handleCancelBooking = async (booking: BookingItem) => {
    setCancellingId(booking._id);
    try {
      const apiUrl = (
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"
      ).replace(/\/+$/, "");

      let updated = false;
      try {
        const res = await fetch(`${apiUrl}/bookings/${booking._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Cancelled" }),
        });
        if (res.ok) {
          updated = true;
        }
      } catch {
        // Fallback to Next.js API route
      }

      if (!updated) {
        const fallbackRes = await fetch(`/api/bookings/${booking._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "Cancelled" }),
        });
        if (!fallbackRes.ok) {
          throw new Error("Failed to cancel booking.");
        }
      }

      setBookings((prev) =>
        prev.map((item) =>
          item._id === booking._id ? { ...item, status: "Cancelled" } : item
        )
      );

      confirmDialogRef.current?.close("confirmed");

      toast.add({
        title: "Booking Cancelled",
        description: `Your reservation for "${booking.studioTitle}" on ${booking.shootDate} has been cancelled.`,
        type: "info",
      });

      router.refresh();
    } catch (error) {
      toast.add({
        title: "Unable to Cancel Booking",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred.",
        type: "error",
      });
    } finally {
      setCancellingId(null);
    }
  };

  const filteredBookings =
    selectedFilter === "All"
      ? bookings
      : bookings.filter((b) => b.status === selectedFilter);

  const counts = React.useMemo(
    () => ({
      total: bookings.length,
      pending: bookings.filter((b) => b.status === "Pending").length,
      confirmed: bookings.filter(
        (b) => b.status === "Confirmed" || b.status === "Completed"
      ).length,
      cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    }),
    [bookings]
  );

  if (bookings.length === 0) {
    return (
      <Card className="mx-auto max-w-xl rounded-3xl border border-dashed border-border bg-card p-10 text-center">
        <CardHeader className="space-y-2 px-0">
          <CardTitle className="font-heading text-xl font-bold text-foreground">
            No Studio Bookings Yet
          </CardTitle>
          <p className="text-sm leading-relaxed text-muted-foreground">
            You haven&apos;t reserved any production studios yet. Explore our
            verified photography lofts, sound stages, podcast rooms, and music
            suites to book your first session.
          </p>
        </CardHeader>
        <CardFooter className="justify-center border-0 bg-transparent pt-4">
          <Button
            variant="default"
            render={<Link href="/studios" />}
            className="h-10 rounded-lg px-6 text-sm font-semibold shadow-sm"
          >
            <Sparkles className="mr-2 size-4" />
            Explore Studios to Book
            <ArrowRight className="ml-1.5 size-4" />
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-2xs">
          <span className="text-xs font-medium text-muted-foreground">
            Total Reservations
          </span>
          <p className="mt-1.5 font-heading text-2xl font-bold text-foreground">
            {counts.total}
          </p>
        </div>
        <div className="rounded-2xl border border-amber-500/25 bg-amber-500/5 p-5">
          <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
            Pending Slots
          </span>
          <p className="mt-1.5 font-heading text-2xl font-bold text-foreground">
            {counts.pending}
          </p>
        </div>
        <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/5 p-5">
          <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
            Confirmed / Completed
          </span>
          <p className="mt-1.5 font-heading text-2xl font-bold text-foreground">
            {counts.confirmed}
          </p>
        </div>
        <div className="rounded-2xl border border-destructive/25 bg-destructive/5 p-5">
          <span className="text-xs font-medium text-destructive">
            Cancelled Slots
          </span>
          <p className="mt-1.5 font-heading text-2xl font-bold text-foreground">
            {counts.cancelled}
          </p>
        </div>
      </div>

      {/* Status Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {STATUS_FILTERS.map((status) => {
            const active = selectedFilter === status;
            return (
              <Button
                key={status}
                type="button"
                variant={active ? "default" : "outline"}
                onClick={() => setSelectedFilter(status)}
                className="h-9 rounded-lg px-4 text-xs font-semibold"
              >
                {status}
              </Button>
            );
          })}
        </div>
        <p className="text-xs font-medium text-muted-foreground">
          Showing {filteredBookings.length} of {bookings.length} reservations
        </p>
      </div>

      {/* Equal-Height Booking Cards Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredBookings.map((booking) => {
          const isPending = booking.status === "Pending";
          const isCancelling = cancellingId === booking._id;

          return (
            <Card
              key={booking._id}
              className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs transition-all duration-300 hover:border-primary/40 hover:shadow-md"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                  <img
                    src={booking.studioImage}
                    alt={booking.studioTitle}
                    loading="lazy"
                    width={640}
                    height={400}
                    className="size-full object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/25"
                  />
                  <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                    <Badge className="h-6 rounded-full bg-background/95 px-3 text-xs font-semibold text-foreground">
                      {booking.studioCategory}
                    </Badge>
                    <BookingStatusBadge status={booking.status} />
                  </div>
                  <div className="absolute right-3.5 bottom-3.5 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                    Total: ${booking.totalAmount}
                  </div>
                </div>

                <CardHeader className="space-y-2 px-5 pt-5 pb-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <MapPin className="size-3.5 shrink-0 text-primary" />
                    <span className="truncate">{booking.studioLocation}</span>
                  </div>
                  <CardTitle className="line-clamp-2 font-heading text-lg font-bold leading-snug text-foreground">
                    <Link
                      href={`/studios/${booking.studioId}`}
                      className="hover:text-primary hover:underline"
                    >
                      {booking.studioTitle}
                    </Link>
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-3 px-5 pb-4">
                  <div className="grid grid-cols-2 gap-2.5 rounded-xl border border-border bg-muted/30 p-3 text-xs">
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Calendar className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate font-medium">
                        {booking.shootDate}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-foreground">
                      <Clock className="size-3.5 shrink-0 text-primary" />
                      <span className="truncate font-medium">
                        {booking.startTime} ({booking.hours}h)
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Users className="size-3.5 shrink-0 text-primary" />
                      <span>{booking.crewSize} Crew</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <DollarSign className="size-3.5 shrink-0 text-primary" />
                      <span>${booking.hourlyRate}/hr</span>
                    </div>
                  </div>
                </CardContent>
              </div>

              <CardFooter className="mt-auto flex items-center justify-between gap-2 border-t border-border bg-muted/30 px-5 py-4">
                <Button
                  variant="outline"
                  render={<Link href={`/studios/${booking.studioId}`} />}
                  className="h-9 rounded-lg px-3.5 text-xs font-semibold"
                >
                  View Studio
                  <ExternalLink className="ml-1.5 size-3.5" />
                </Button>

                {isPending ? (
                  <Button
                    type="button"
                    variant="destructive"
                    disabled={isCancelling}
                    onClick={() => promptCancelBooking(booking)}
                    className="h-9 rounded-lg px-3.5 text-xs font-semibold"
                  >
                    {isCancelling ? (
                      <>
                        <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                        Cancelling...
                      </>
                    ) : (
                      <>
                        <XCircle className="mr-1.5 size-3.5" />
                        Cancel Booking
                      </>
                    )}
                  </Button>
                ) : (
                  <span className="text-xs font-medium text-muted-foreground">
                    {booking.status === "Cancelled"
                      ? "Slot Cancelled"
                      : "Slot Locked"}
                  </span>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Responsive Bookings Ledger Table (follows modern-web-guidance `responsive-table`) */}
      <div className="space-y-3 pt-4">
        <h2 className="font-heading text-xl font-bold text-foreground">
          Reservation Schedule Ledger
        </h2>
        <div
          tabIndex={0}
          role="region"
          aria-labelledby="bookings-table-caption"
          className="bookings-table-wrapper rounded-2xl border border-border bg-card shadow-xs"
        >
          <table className="w-full text-left text-sm">
            <caption id="bookings-table-caption" className="sr-only">
              Your studio reservations and booking statuses
            </caption>
            <thead className="border-b border-border bg-muted/70 text-xs font-semibold tracking-wider text-muted-foreground uppercase backdrop-blur-md">
              <tr>
                <th scope="col" className="px-5 py-3.5">
                  Studio Workspace
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Session Schedule
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Crew Size
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Total Amount
                </th>
                <th scope="col" className="px-5 py-3.5">
                  Status
                </th>
                <th scope="col" className="px-5 py-3.5 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredBookings.map((booking) => {
                const isPending = booking.status === "Pending";
                const isCancelling = cancellingId === booking._id;

                return (
                  <tr
                    key={booking._id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <th
                      scope="row"
                      className="px-5 py-4 font-heading font-semibold text-foreground"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={booking.studioImage}
                          alt={booking.studioTitle}
                          width={56}
                          height={40}
                          className="h-10 w-14 shrink-0 rounded-lg object-cover"
                        />
                        <div className="min-w-0">
                          <Link
                            href={`/studios/${booking.studioId}`}
                            className="line-clamp-1 font-bold hover:text-primary hover:underline"
                          >
                            {booking.studioTitle}
                          </Link>
                          <span className="block text-xs font-normal text-muted-foreground">
                            {booking.studioCategory} • {booking.studioLocation}
                          </span>
                        </div>
                      </div>
                    </th>
                    <td className="px-5 py-4 text-xs text-foreground">
                      <div>
                        <span className="font-semibold">
                          {booking.shootDate}
                        </span>
                        <span className="block text-muted-foreground">
                          {booking.startTime} ({booking.hours} hrs)
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs text-muted-foreground">
                      Up to {booking.crewSize} crew
                    </td>
                    <td className="px-5 py-4 font-heading text-sm font-bold text-foreground">
                      ${booking.totalAmount}
                      <span className="block text-[11px] font-normal text-muted-foreground">
                        Includes ${booking.securityDeposit} deposit
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <BookingStatusBadge status={booking.status} />
                    </td>
                    <td className="px-5 py-4 text-right">
                      {isPending ? (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          disabled={isCancelling}
                          onClick={() => promptCancelBooking(booking)}
                          className="h-8 rounded-lg px-3 text-xs font-semibold"
                        >
                          {isCancelling ? (
                            <Loader2 className="size-3.5 animate-spin" />
                          ) : (
                            "Cancel Booking"
                          )}
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          render={<Link href={`/studios/${booking.studioId}`} />}
                          className="h-8 rounded-lg px-3 text-xs font-semibold"
                        >
                          View Space
                        </Button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Native <dialog> Destructive Confirmation Modal for Cancelling a Pending Slot */}
      <dialog
        ref={confirmDialogRef}
        id={confirmDialogId}
        aria-labelledby={confirmTitleId}
        {...({ closedby: "any" } as React.HTMLAttributes<HTMLDialogElement>)}
        className="m-auto w-full max-w-md rounded-3xl border border-border bg-card p-6 text-card-foreground shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-xs open:flex open:flex-col"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-destructive/15 text-destructive">
              <AlertTriangle className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2
                id={confirmTitleId}
                className="font-heading text-lg font-bold text-foreground"
              >
                Cancel Pending Studio Slot?
              </h2>
              <p className="text-xs text-muted-foreground">
                This action will release your reserved studio hours.
              </p>
            </div>
          </div>

          <form method="dialog">
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              value="cancel"
              aria-label="Close confirmation dialog"
              className="size-8 rounded-full"
            >
              <X className="size-4" />
            </Button>
          </form>
        </div>

        {targetBooking && (
          <div className="my-5 space-y-2 rounded-2xl border border-border bg-muted/40 p-4 text-xs">
            <p className="font-heading text-sm font-bold text-foreground">
              {targetBooking.studioTitle}
            </p>
            <p className="text-muted-foreground">
              Date: <strong>{targetBooking.shootDate}</strong> •{" "}
              <strong>{targetBooking.startTime}</strong> ({targetBooking.hours}{" "}
              hrs)
            </p>
            <p className="text-muted-foreground">
              Total Refundable Hold: <strong>${targetBooking.totalAmount}</strong>
            </p>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-2">
          <form method="dialog">
            {/* Safe action receives autofocus per modern-web-guidance `dialog` spec */}
            <Button
              type="submit"
              variant="outline"
              value="keep"
              autoFocus
              className="h-10 rounded-lg px-4 text-xs font-semibold"
            >
              Keep Booking
            </Button>
          </form>
          <Button
            type="button"
            variant="destructive"
            disabled={Boolean(cancellingId)}
            onClick={() => targetBooking && handleCancelBooking(targetBooking)}
            className="h-10 rounded-lg px-4 text-xs font-semibold"
          >
            {cancellingId ? (
              <>
                <Loader2 className="mr-1.5 size-3.5 animate-spin" />
                Cancelling...
              </>
            ) : (
              "Yes, Cancel Booking"
            )}
          </Button>
        </div>
      </dialog>
    </div>
  );
}

