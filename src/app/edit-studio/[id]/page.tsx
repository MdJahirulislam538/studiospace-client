import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import { ObjectId } from "mongodb";
import { Sparkles } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/db";
import type { StudioItem } from "@/types/studio";
import { Badge } from "@/components/ui/badge";
import { EditStudioForm } from "@/components/studios/edit-studio-form";

interface EditStudioPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditStudioPage({ params }: EditStudioPageProps) {
  const { id } = await params;
  const reqHeaders = await headers();

  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session?.user) {
    redirect(`/login?callbackUrl=/edit-studio/${id}`);
  }

  const { token } = await auth.api.getToken({
    headers: reqHeaders,
  });

  let doc: Record<string, unknown> | null = null;
  try {
    if (ObjectId.isValid(id)) {
      doc = await db.collection("studios").findOne({ _id: new ObjectId(id) });
    }
    if (!doc) {
      doc = await db.collection("studios").findOne({ slug: id });
    }
  } catch {
    doc = null;
  }

  if (!doc) {
    notFound();
  }

  const studio: StudioItem = {
    _id: String(doc._id),
    slug: String(doc.slug || doc._id),
    title: String(doc.title || ""),
    category: (doc.category as StudioItem["category"]) || "Photo Studio",
    hourlyRate: Number(doc.hourlyRate ?? 0),
    securityDeposit: Number(doc.securityDeposit ?? 0),
    capacity: Number(doc.capacity ?? 10),
    sqft: Number(doc.sqft ?? 1500),
    rating: Number(doc.rating ?? 5.0),
    reviewCount: Number(doc.reviewCount ?? 1),
    location: String(doc.location || ""),
    image: String(doc.image || ""),
    amenities: Array.isArray(doc.amenities) ? (doc.amenities as string[]) : [],
    overview: String(doc.overview || ""),
    hostName: String(doc.hostName || session.user.name || "Studio Host"),
    hostEmail: String(doc.hostEmail || session.user.email || ""),
  };

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 max-w-3xl space-y-3">
        <Badge
          variant="secondary"
          className="h-7 rounded-full px-3.5 text-xs font-semibold text-primary"
        >
          <Sparkles className="mr-1.5 size-3.5" />
          Host Studio Portal — Private Route
        </Badge>
        <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          Edit Studio Listing
        </h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Update the details for{" "}
          <span className="font-semibold text-foreground">{studio.title}</span>.
          Changes will be saved directly to the MongoDB{" "}
          <code className="rounded bg-muted px-1.5 py-0.5 text-xs font-semibold text-foreground">
            studios
          </code>{" "}
          collection.
        </p>
      </div>

      <EditStudioForm
        token={token}
        studio={studio}
        user={{
          name: session.user.name || "Studio Host",
          email: session.user.email,
        }}
      />
    </section>
  );
}

