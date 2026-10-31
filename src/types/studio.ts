export type StudioCategory =
  | "Photo Studios"
  | "Sound Stages"
  | "Podcast Rooms"
  | "Music Suites"
  | "Art Workshops";

export interface StudioItem {
  _id: string;
  title: string;
  slug: string;
  category: StudioCategory;
  hourlyRate: number;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  sqft: number;
  capacity: number;
  amenities: string[];
  featured?: boolean;
  createdAt?: string;
}

