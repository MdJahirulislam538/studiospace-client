import { ObjectId } from "mongodb";
import { db } from "@/db";
import type { StudioItem } from "@/types/studio";

export const INITIAL_STUDIOS: StudioItem[] = [
  {
    _id: "studio-01",
    title: "Aperture 09 Daylight & Seamless Cyc Loft",
    slug: "aperture-09-daylight-cyc-loft",
    category: "Photo Studios",
    hourlyRate: 95,
    securityDeposit: 250,
    rating: 4.96,
    reviewCount: 142,
    location: "SoHo, New York, NY",
    image:
      "https://images.unsplash.com/photo-1526040652367-ac003a0475fe?auto=format&fit=crop&w=1200&q=85",
    sqft: 2400,
    capacity: 25,
    amenities: [
      "28ft Corner Cyc Wall",
      "Profoto Pro-11 Strobe Kit",
      "South-Facing Skylights",
      "Motorized Blackout Shades",
      "Hair & Makeup Vanity Station",
      "10Gbps Symmetrical Fiber",
    ],
    overview:
      "Aperture 09 is a flagship 2,400 sq.ft. architectural daylight loft in the heart of SoHo featuring 16-foot ceilings, a freshly painted 28ft two-wall corner cyclorama, and bank-spanning south-facing skylights with motorized blackout control. Built for commercial fashion campaigns, lookbooks, and high-speed editorial photography.",
    hostName: "Elena Vance (Aperture Collective)",
    hostEmail: "elena@aperturestudios.nyc",
    featured: true,
    createdAt: "2026-10-15T10:00:00.000Z",
  },
  {
    _id: "studio-02",
    title: "Stage K — NC-20 Soundproof Cinema & XR Volume",
    slug: "stage-k-soundproof-cinema-xr-volume",
    category: "Sound Stages",
    hourlyRate: 240,
    securityDeposit: 600,
    rating: 4.98,
    reviewCount: 89,
    location: "Arts District, Los Angeles, CA",
    image:
      "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=85",
    sqft: 6800,
    capacity: 60,
    amenities: [
      "18ft Motorized Lighting Grid",
      "400A 3-Phase Camlock Power",
      "Drive-In Elephant Door",
      "NC-20 Acoustic Rating",
      "Private VIP Green Rooms",
      "Production Office & DIT Bay",
    ],
    overview:
      "Stage K is an industry-certified NC-20 soundproof cinema stage and virtual production volume engineered for narrative film, commercial television, and multi-camera music videos. Features 400A 3-phase Camlock power distribution, an 18-foot motorized truss grid, silent HVAC, and direct street-level grip truck drive-in access.",
    hostName: "Marcus Sterling (Kinetix Stages LA)",
    hostEmail: "bookings@kinetixstages.com",
    featured: true,
    createdAt: "2026-10-18T14:30:00.000Z",
  },
  {
    _id: "studio-03",
    title: "VoxHouse 4-Mic Broadcast & Video Podcast Lounge",
    slug: "voxhouse-broadcast-video-podcast-lounge",
    category: "Podcast Rooms",
    hourlyRate: 75,
    securityDeposit: 150,
    rating: 4.94,
    reviewCount: 215,
    location: "East Austin, TX",
    image:
      "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=85",
    sqft: 650,
    capacity: 8,
    amenities: [
      "4x Shure SM7dB + Rodecaster Pro II",
      "3-Cam Sony FX3 Iso Recording",
      "Floating Acoustic Booth",
      "ATEM Mini Extreme ISO Switcher",
      "Programmable Amaran RGB Key Lights",
      "Green Room & Espresso Bar",
    ],
    overview:
      "Walk in, sit down, and record broadcast-ready 4K multi-cam video podcasts with zero setup friction. VoxHouse comes pre-patched with four Shure SM7dB vocal chains, Cloudlifter preamps, three cinema-grade Sony FX3 cameras recording isolated 4K tracks, and customizable acoustic timber backdrops.",
    hostName: "Devon Brooks (VoxHouse Media)",
    hostEmail: "studio@voxhouse.fm",
    featured: true,
    createdAt: "2026-10-20T09:15:00.000Z",
  },
  {
    _id: "studio-04",
    title: "Obsidian Room A — SSL Console & Dolby Atmos Suite",
    slug: "obsidian-room-a-ssl-dolby-atmos-suite",
    category: "Music Suites",
    hourlyRate: 130,
    securityDeposit: 350,
    rating: 4.97,
    reviewCount: 164,
    location: "Music Row, Nashville, TN",
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1200&q=85",
    sqft: 1450,
    capacity: 14,
    amenities: [
      "7.1.4 Genelec Atmos Monitoring",
      "Neve 1073 Outboard Rack",
      "Isolated Steinway B Live Room",
      "SSL Origin 32-Channel Console",
      "Pro Tools HDX Rig + UAD Octo",
      "Vintage Neumann & Telefunken Locker",
    ],
    overview:
      "Designed by Walters-Storyk acoustic architects, Obsidian Room A pairs an analog 32-channel SSL Origin console and vintage outboard rack with a Trinnov-calibrated 7.1.4 Genelec Dolby Atmos mix environment. Includes sightline access to a 550 sq.ft. birch-diffused live tracking room.",
    hostName: "Clara Jennings (Obsidian Sound)",
    hostEmail: "clara@obsidiansound.io",
    featured: true,
    createdAt: "2026-10-22T16:00:00.000Z",
  },
  {
    _id: "studio-05",
    title: "Foundry Kiln & Industrial Sculpture Atelier",
    slug: "foundry-kiln-industrial-sculpture-atelier",
    category: "Art Workshops",
    hourlyRate: 60,
    securityDeposit: 200,
    rating: 4.91,
    reviewCount: 97,
    location: "Bushwick, Brooklyn, NY",
    image:
      "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=1200&q=85",
    sqft: 3100,
    capacity: 20,
    amenities: [
      "Heavy-Duty Hoist & Concrete Floors",
      "Industrial Ventilation Hoods",
      "Natural North Skylight",
      "Double-Wide Freight Elevator",
      "Slop Sinks & Compressed Air Drops",
      "240V Fabrication Outlets",
    ],
    overview:
      "A rugged 3,100 sq.ft. industrial fabrication workshop and fine-art atelier tailored for set builders, prop makers, ceramicists, and large-scale installation artists. Equipped with sealed concrete floors, overhead chain hoist, high-CFM extraction hoods, and north-facing sawtooth skylights.",
    hostName: "Mateo Silva (Bushwick Foundry)",
    hostEmail: "mateo@bushwickfoundry.art",
    featured: true,
    createdAt: "2026-10-25T11:45:00.000Z",
  },
  {
    _id: "studio-06",
    title: "Lumen House — Editorial Portrait & Set Design Loft",
    slug: "lumen-house-editorial-portrait-loft",
    category: "Photo Studios",
    hourlyRate: 110,
    securityDeposit: 250,
    rating: 4.95,
    reviewCount: 118,
    location: "Fulton Market, Chicago, IL",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
    sqft: 2900,
    capacity: 30,
    amenities: [
      "Modular Archway Set Walls",
      "Dedicated Hair & Makeup Vanity",
      "Full Chef Prep Kitchen",
      "Aputure 1200d Pro LED Package",
      "Curated Mid-Century Prop Collection",
      "Client Viewing Mezzanine",
    ],
    overview:
      "Lumen House blends warm limestone textures, movable limewash archway walls, and curated designer furniture with a working commercial chef's island—making it the premier Midwest destination for culinary video shoots, lifestyle brand campaigns, and architectural portraiture.",
    hostName: "Hannah Lin (Lumen House Studios)",
    hostEmail: "hello@lumenhouse.co",
    featured: true,
    createdAt: "2026-10-28T08:00:00.000Z",
  },
];

function mapStudioDoc(
  doc: Record<string, unknown>,
  fallback: StudioItem = INITIAL_STUDIOS[0]
): StudioItem {
  return {
    _id: String(doc._id),
    title: typeof doc.title === "string" && doc.title ? doc.title : fallback.title,
    slug:
      typeof doc.slug === "string" && doc.slug
        ? doc.slug
        : String(doc._id || fallback.slug),
    category: (doc.category as StudioItem["category"]) || fallback.category,
    hourlyRate:
      typeof doc.hourlyRate === "number"
        ? doc.hourlyRate
        : Number(doc.hourlyRate) || fallback.hourlyRate,
    securityDeposit:
      typeof doc.securityDeposit === "number"
        ? doc.securityDeposit
        : Number(doc.securityDeposit ?? fallback.securityDeposit ?? 200),
    rating:
      typeof doc.rating === "number"
        ? doc.rating
        : Number(doc.rating) || fallback.rating,
    reviewCount:
      typeof doc.reviewCount === "number"
        ? doc.reviewCount
        : Number(doc.reviewCount) || fallback.reviewCount,
    location:
      typeof doc.location === "string" && doc.location
        ? doc.location
        : fallback.location,
    image:
      typeof doc.image === "string" && doc.image ? doc.image : fallback.image,
    sqft:
      typeof doc.sqft === "number"
        ? doc.sqft
        : Number(doc.sqft) || fallback.sqft,
    capacity:
      typeof doc.capacity === "number"
        ? doc.capacity
        : Number(doc.capacity) || fallback.capacity,
    amenities: Array.isArray(doc.amenities)
      ? (doc.amenities as string[])
      : fallback.amenities,
    overview:
      typeof doc.overview === "string" && doc.overview
        ? doc.overview
        : fallback.overview,
    hostName:
      typeof doc.hostName === "string" && doc.hostName
        ? doc.hostName
        : fallback.hostName,
    hostEmail:
      typeof doc.hostEmail === "string" && doc.hostEmail
        ? doc.hostEmail
        : fallback.hostEmail,
    featured: Boolean(doc.featured ?? true),
    createdAt:
      typeof doc.createdAt === "string" ? doc.createdAt : fallback.createdAt,
  };
}

/**
 * Fetches 6 top-rated or newest studio spaces dynamically from MongoDB using `.limit(6)`.
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
      return docs.map((doc, idx) =>
        mapStudioDoc(
          doc as Record<string, unknown>,
          INITIAL_STUDIOS[idx % INITIAL_STUDIOS.length]
        )
      );
    }

    return INITIAL_STUDIOS.slice(0, 6);
  } catch {
    return INITIAL_STUDIOS.slice(0, 6);
  }
}

/**
 * Fetches all studio spaces from MongoDB for the /studios catalog page.
 */
export async function getAllStudios(): Promise<StudioItem[]> {
  if (!process.env.MONGODB_URL) {
    return INITIAL_STUDIOS;
  }

  try {
    const collection = db.collection("studios");
    const docs = await collection
      .find({})
      .sort({ createdAt: -1, rating: -1 })
      .toArray();

    if (docs.length > 0) {
      return docs.map((doc, idx) =>
        mapStudioDoc(
          doc as Record<string, unknown>,
          INITIAL_STUDIOS[idx % INITIAL_STUDIOS.length]
        )
      );
    }

    return INITIAL_STUDIOS;
  } catch {
    return INITIAL_STUDIOS;
  }
}

/**
 * Fetches a single studio by its MongoDB ObjectId, string _id, or slug.
 */
export async function getStudioById(idOrSlug: string): Promise<StudioItem | null> {
  const decoded = decodeURIComponent(idOrSlug);

  if (process.env.MONGODB_URL) {
    try {
      const collection = db.collection("studios");
      let doc: Record<string, unknown> | null = null;

      if (ObjectId.isValid(decoded)) {
        doc = (await collection.findOne({
          _id: new ObjectId(decoded),
        })) as Record<string, unknown> | null;
      }

      if (!doc) {
        doc = (await collection.findOne({
          $or: [{ _id: decoded as unknown as ObjectId }, { slug: decoded }],
        })) as Record<string, unknown> | null;
      }

      if (doc) {
        return mapStudioDoc(doc);
      }
    } catch {
      // Fall through to INITIAL_STUDIOS lookup
    }
  }

  const staticMatch = INITIAL_STUDIOS.find(
    (s) => s._id === decoded || s.slug === decoded
  );
  return staticMatch || null;
}
