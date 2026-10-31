import { getFeaturedStudios } from "@/lib/studios";
import { HeroSlider } from "@/components/home/hero-slider";
import { FeaturedStudios } from "@/components/home/featured-studios";
import { StudioCategories } from "@/components/home/studio-categories";
import { HowBookingWorks } from "@/components/home/how-booking-works";
import { HostGuarantee } from "@/components/home/host-guarantee";

export default async function Home() {
  const featuredStudios = await getFeaturedStudios();

  return (
    <div className="flex flex-col">
      {/* 1. Banner / Hero Slider (4 interactive slides, primary CTAs to /studios) */}
      <HeroSlider />

      {/* 2. Featured Studios Section (Dynamic MongoDB .limit(6) fetch) */}
      <FeaturedStudios studios={featuredStudios} />

      {/* 3. Browse by Studio Categories (Redirects to /studios?category=...) */}
      <StudioCategories />

      {/* 4. Extra Section 1: How Booking Works (4-step workflow) */}
      <HowBookingWorks />

      {/* 5. Extra Section 2: Host Guarantee & Creator Support */}
      <HostGuarantee />
    </div>
  );
}
