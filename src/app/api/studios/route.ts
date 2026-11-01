import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { db } from "@/db";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const category = searchParams.get("category");

    const filter: Record<string, unknown> = {};
    if (email) {
      filter.hostEmail = email;
    }
    if (category && category !== "All") {
      filter.category = category;
    }

    const studios = await db
      .collection("studios")
      .find(filter)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({
      studios: studios.map((doc) => ({
        ...doc,
        _id: String(doc._id),
      })),
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch studios";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to add a studio." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const {
      title,
      category,
      hourlyRate,
      securityDeposit,
      capacity,
      sqft,
      location,
      image,
      amenities,
      overview,
    } = body;

    if (
      !title?.trim() ||
      !category?.trim() ||
      hourlyRate === undefined ||
      securityDeposit === undefined ||
      capacity === undefined ||
      !location?.trim() ||
      !image?.trim() ||
      !overview?.trim()
    ) {
      return NextResponse.json(
        { error: "Please fill in all required studio fields." },
        { status: 400 }
      );
    }

    const parsedHourlyRate = Number(hourlyRate);
    const parsedDeposit = Number(securityDeposit);
    const parsedCapacity = Number(capacity);
    const parsedSqft = Number(sqft) || 1200;

    if (
      Number.isNaN(parsedHourlyRate) ||
      parsedHourlyRate <= 0 ||
      Number.isNaN(parsedDeposit) ||
      parsedDeposit < 0 ||
      Number.isNaN(parsedCapacity) ||
      parsedCapacity <= 0
    ) {
      return NextResponse.json(
        {
          error:
            "Hourly rate, security deposit, and max capacity must be valid numbers.",
        },
        { status: 400 }
      );
    }

    const slug = `${String(title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")}-${Date.now().toString().slice(-4)}`;

    const newStudioDoc = {
      title: String(title).trim(),
      slug,
      category: String(category).trim(),
      hourlyRate: parsedHourlyRate,
      securityDeposit: parsedDeposit,
      capacity: parsedCapacity,
      sqft: parsedSqft,
      location: String(location).trim(),
      image: String(image).trim(),
      amenities: Array.isArray(amenities)
        ? amenities.map((a) => String(a).trim()).filter(Boolean)
        : [],
      overview: String(overview).trim(),
      rating: 5.0,
      reviewCount: 1,
      featured: true,
      hostId: session.user.id,
      hostName: session.user.name || "Studio Host",
      hostEmail: session.user.email,
      createdAt: new Date().toISOString(),
    };

    const result = await db.collection("studios").insertOne(newStudioDoc);

    return NextResponse.json(
      {
        message: "Studio added successfully",
        studio: {
          ...newStudioDoc,
          _id: String(result.insertedId),
        },
      },
      { status: 201 }
    );
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Failed to create studio";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

