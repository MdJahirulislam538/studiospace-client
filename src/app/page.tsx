import { Suspense } from "react";
import { getFeaturedStudios } from "@/lib/studios";
import { HeroSlider } from "@/components/home/hero-slider";
import { FeaturedStudios } from "@/components/home/featured-studios";
import { StudioCategories } from "@/components/home/studio-categories";
import { HowBookingWorks } from "@/components/home/how-booking-works";
import { HostGuarantee } from "@/components/home/host-guarantee";
import { StudioCardGridSkeleton } from "@/components/studios/studio-skeletons";

async function FeaturedStudiosSection() {
  const featuredStudios = await getFeaturedStudios();
  return <FeaturedStudios studios={featuredStudios} />;
}

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 1. Banner / Hero Slider (4 interactive slides, primary CTAs to /studios) */}
      <HeroSlider />

      {/* 2. Featured Studios Section wrapped in Suspense (Dynamic MongoDB .limit(6) fetch) */}
      <Suspense
        fallback={
          <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
            <StudioCardGridSkeleton count={6} />
          </section>
        }
      >
        <FeaturedStudiosSection />
      </Suspense>

      {/* 3. Browse by Studio Categories (Redirects to /studios?category=...) */}
      <StudioCategories />

      {/* 4. Extra Section 1: How Booking Works (4-step workflow) */}
      <HowBookingWorks />

      {/* 5. Extra Section 2: Host Guarantee & Creator Support */}
      <HostGuarantee />
    </div>
  );
}
