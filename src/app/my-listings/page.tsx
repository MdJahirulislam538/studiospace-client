import { Suspense } from "react";
import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  ArrowRight,
  MapPin,
  Pencil,
  PlusCircle,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/db";
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

async function MyListingsGrid({ userEmail }: { userEmail: string }) {
  let myStudios: Array<Record<string, unknown>> = [];
  try {
    const docs = await db
      .collection("studios")
      .find({ hostEmail: userEmail })
      .sort({ createdAt: -1 })
      .toArray();
    myStudios = docs.map((doc) => ({
      ...doc,
      _id: String(doc._id),
    }));
  } catch {
    myStudios = [];
  }

  if (myStudios.length === 0) {
    return (
      <Card className="mx-auto max-w-xl rounded-3xl border border-dashed border-border bg-card p-10 text-center">
        <CardHeader className="space-y-2 px-0">
          <CardTitle className="font-heading text-xl font-bold text-foreground">
            No Studios Listed Yet
          </CardTitle>
          <p className="text-sm leading-relaxed text-muted-foreground">
            You haven&apos;t published any studio spaces yet. Click below to
            list your photography loft, film stage, podcast lounge, or music
            suite.
          </p>
        </CardHeader>
        <CardFooter className="justify-center border-0 bg-transparent pt-4">
          <Button
            variant="default"
            render={<Link href="/add-studio" />}
            className="h-10 rounded-lg px-6 text-sm font-semibold shadow-sm"
          >
            <PlusCircle className="mr-2 size-4" />
            List Your First Studio
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {myStudios.map((studio) => {
        const id = String(studio._id);
        const title = String(studio.title || "Untitled Studio");
        const category = String(studio.category || "Photo Studio");
        const hourlyRate = Number(studio.hourlyRate || 0);
        const securityDeposit = Number(studio.securityDeposit || 0);
        const capacity = Number(studio.capacity || 10);
        const location = String(studio.location || "");
        const image = String(
          studio.image ||
            "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&fit=crop&w=900&q=80"
        );
        const amenities = Array.isArray(studio.amenities)
          ? (studio.amenities as string[])
          : [];

        return (
          <Card
            key={id}
            className="flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card p-0 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-md"
          >
            <div>
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  width={640}
                  height={400}
                  className="size-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/25"
                />
                <div className="absolute inset-x-3.5 top-3.5 flex items-center justify-between">
                  <Badge className="h-6 rounded-full bg-background/95 px-3 text-xs font-semibold text-foreground">
                    {category}
                  </Badge>
                  <span className="inline-flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-xs font-semibold text-white">
                    <ShieldCheck className="size-3.5 text-primary" />
                    Active
                  </span>
                </div>
                <div className="absolute right-3.5 bottom-3.5 rounded-lg bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">
                  ${hourlyRate} / hr
                </div>
              </div>

              <CardHeader className="space-y-2 px-5 pt-5 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                  <MapPin className="size-3.5 shrink-0 text-primary" />
                  <span className="truncate">{location}</span>
                </div>
                <CardTitle className="line-clamp-2 font-heading text-lg font-bold leading-snug text-foreground">
                  {title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-3 px-5 pb-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Deposit: ${securityDeposit}</span>
                  <span className="inline-flex items-center gap-1">
                    <Users className="size-3.5 text-primary" />
                    Max {capacity} crew
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {amenities.slice(0, 3).map((amenity) => (
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
                  ${hourlyRate}{" "}
                  <span className="text-xs font-normal text-muted-foreground">
                    / hr
                  </span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  render={<Link href={`/edit-studio/${id}`} />}
                  className="h-10 rounded-lg px-3.5 text-sm font-semibold"
                >
                  <Pencil className="mr-1.5 size-3.5" />
                  Edit
                </Button>
                <Button
                  variant="default"
                  render={<Link href={`/studios/${id}`} />}
                  className="h-10 rounded-lg px-4 text-sm font-semibold shadow-sm"
                >
                  View
                  <ArrowRight className="ml-1.5 size-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

export default async function MyListingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/login?callbackUrl=/my-listings");
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-10 flex flex-col items-start justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end">
        <div className="space-y-2.5">
          <Badge
            variant="secondary"
            className="h-7 rounded-full px-3.5 text-xs font-semibold text-primary"
          >
            <Sparkles className="mr-1.5 size-3.5" />
            Host Studio Management
          </Badge>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            My Studio Listings
          </h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Manage creative spaces published under{" "}
            <span className="font-semibold text-foreground">
              {session.user.email}
            </span>
            .
          </p>
        </div>

        <Button
          variant="default"
          render={<Link href="/add-studio" />}
          className="h-10 rounded-lg px-5 text-sm font-semibold shadow-sm"
        >
          <PlusCircle className="mr-2 size-4" />
          Add New Studio
        </Button>
      </div>

      <Suspense fallback={<StudioCardGridSkeleton count={3} />}>
        <MyListingsGrid userEmail={session.user.email} />
      </Suspense>
    </section>
  );
}
