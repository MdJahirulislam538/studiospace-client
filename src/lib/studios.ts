import { db } from "@/db";
import type { StudioItem } from "@/types/studio";

export const INITIAL_STUDIOS: StudioItem[] = [
  {
    _id: "studio-01",
    title: "Aperture 09 Daylight & Seamless Cyc Loft",
    slug: "aperture-09-daylight-cyc-loft",
    category: "Photo Studios",
    hourlyRate: 95,
    rating: 4.96,
    reviewCount: 142,
    location: "SoHo, New York, NY",
    image:
      "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&fit=crop&w=1200&q=85",
    sqft: 2400,
    capacity: 25,
    amenities: ["28ft Corner Cyc Wall", "Profoto Pro-11 Strobe Kit", "South-Facing Skylights"],
    featured: true,
    createdAt: "2026-10-15T10:00:00.000Z",
  },
  {
    _id: "studio-02",
    title: "Stage K — NC-20 Soundproof Cinema & XR Volume",
    slug: "stage-k-soundproof-cinema-xr-volume",
    category: "Sound Stages",
    hourlyRate: 240,
    rating: 4.98,
    reviewCount: 89,
    location: "Arts District, Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=85",
    sqft: 6800,
    capacity: 60,
    amenities: ["18ft Motorized Lighting Grid", "400A 3-Phase Camlock", "Drive-In Elephant Door"],
    featured: true,
    createdAt: "2026-10-18T14:30:00.000Z",
  },
  {
    _id: "studio-03",
    title: "VoxHouse 4-Mic Broadcast & Video Podcast Lounge",
    slug: "voxhouse-broadcast-video-podcast-lounge",
    category: "Podcast Rooms",
    hourlyRate: 75,
    rating: 4.94,
    reviewCount: 215,
    location: "East Austin, TX",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=85",
    sqft: 650,
    capacity: 8,
    amenities: ["4x Shure SM7dB + Rodecaster Pro II", "3-Cam Sony FX3 Iso Recording", "Floating Acoustic Booth"],
    featured: true,
    createdAt: "2026-10-20T09:15:00.000Z",
  },
  {
    _id: "studio-04",
    title: "Obsidian Room A — SSL Console & Dolby Atmos Suite",
    slug: "obsidian-room-a-ssl-dolby-atmos-suite",
    category: "Music Suites",
    hourlyRate: 130,
    rating: 4.97,
    reviewCount: 164,
    location: "Music Row, Nashville, TN",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85",
    sqft: 1450,
    capacity: 14,
    amenities: ["7.1.4 Genelec Atmos Monitoring", "Neve 1073 Outboard Rack", "Isolated Steinway B Live Room"],
    featured: true,
    createdAt: "2026-10-22T16:00:00.000Z",
  },
  {
    _id: "studio-05",
    title: "Foundry Kiln & Industrial Sculpture Atelier",
    slug: "foundry-kiln-industrial-sculpture-atelier",
    category: "Art Workshops",
    hourlyRate: 60,
    rating: 4.91,
    reviewCount: 97,
    location: "Bushwick, Brooklyn, NY",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85",
    sqft: 3100,
    capacity: 20,
    amenities: ["Heavy-Duty Hoist & Concrete Floors", "Industrial Ventilation Hoods", "Natural North Skylight"],
    featured: true,
    createdAt: "2026-10-25T11:45:00.000Z",
  },
  {
    _id: "studio-06",
    title: "Lumen House — Editorial Portrait & Set Design Loft",
    slug: "lumen-house-editorial-portrait-loft",
    category: "Photo Studios",
    hourlyRate: 110,
    rating: 4.95,
    reviewCount: 118,
    location: "Fulton Market, Chicago, IL",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    sqft: 2900,
    capacity: 30,
    amenities: ["Modular Archway Set Walls", "Dedicated Hair & Makeup Vanity", "Full Chef Prep Kitchen"],
    featured: true,
    createdAt: "2026-10-28T08:00:00.000Z",
  },
];

/**
 * Fetches 6 top-rated or newest studio spaces dynamically from MongoDB using `.limit(6)`.
 * Seeds initial studio documents if the collection is empty, and falls back gracefully
 * if the database connection is unavailable.
 */
export async function getFeaturedStudios(): Promise<StudioItem[]> {
  if (!process.env.MONGODB_URL) {
    return INITIAL_STUDIOS.slice(0, 6);
  }

  try {
    const collection = db.collection("studios");
    const docs = await collection
      .find({})
      .sort({ rating: -1, createdAt: -1 })
      .limit(6)
      .toArray();

    if (docs.length > 0) {
      return docs.map((doc, idx) => {
        const fallback = INITIAL_STUDIOS[idx % INITIAL_STUDIOS.length];
        return {
          _id: String(doc._id),
          title: typeof doc.title === "string" ? doc.title : fallback.title,
          slug: typeof doc.slug === "string" ? doc.slug : fallback.slug,
          category: (doc.category as StudioItem["category"]) || fallback.category,
          hourlyRate:
            typeof doc.hourlyRate === "number" ? doc.hourlyRate : fallback.hourlyRate,
          rating: typeof doc.rating === "number" ? doc.rating : fallback.rating,
          reviewCount:
            typeof doc.reviewCount === "number" ? doc.reviewCount : fallback.reviewCount,
          location: typeof doc.location === "string" ? doc.location : fallback.location,
          image: typeof doc.image === "string" ? doc.image : fallback.image,
          sqft: typeof doc.sqft === "number" ? doc.sqft : fallback.sqft,
          capacity: typeof doc.capacity === "number" ? doc.capacity : fallback.capacity,
          amenities: Array.isArray(doc.amenities) ? doc.amenities : fallback.amenities,
          featured: Boolean(doc.featured ?? true),
          createdAt:
            typeof doc.createdAt === "string" ? doc.createdAt : fallback.createdAt,
        };
      });
    }

    return INITIAL_STUDIOS.slice(0, 6);
  } catch {
    return INITIAL_STUDIOS.slice(0, 6);
  }
}

