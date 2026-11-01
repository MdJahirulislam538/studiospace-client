export type StudioCategory =
  | "Photo Studio"
  | "Film Stage"
  | "Podcast Lounge"
  | "Music Suite"
  | "Workshop"
  | "Photo Studios"
  | "Sound Stages"
  | "Podcast Rooms"
  | "Music Suites"
  | "Art Workshops";

export interface StudioItem {
  _id: string;
  title: string;
  slug: string;
  category: StudioCategory | string;
  hourlyRate: number;
  securityDeposit?: number;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  sqft: number;
  capacity: number;
  amenities: string[];
  overview?: string;
  hostName?: string;
  hostEmail?: string;
  hostId?: string;
  featured?: boolean;
  instantBook?: boolean;
  verifiedEquip?: boolean;
  createdAt?: string;
}
