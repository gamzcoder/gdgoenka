import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LiveTickerBar from "@/components/layout/LiveTickerBar";
import PromoBar from "@/components/layout/PromoBar";
import Associations from "@/components/sections/Associations";
import CoursePathCarousel from "@/components/sections/CoursePathCarousel";
import Courses from "@/components/sections/Courses";
import Facilities from "@/components/sections/Facilities";
import FinalCTA from "@/components/sections/FinalCTA";
import Gallery from "@/components/sections/Gallery";
import HeroWithPhoto from "@/components/sections/HeroWithPhoto";
import ImpactMap from "@/components/sections/ImpactMap";
import Placements from "@/components/sections/Placements";
import SmartChatWidget from "@/components/ui/SmartChatWidget";
import Testimonials from "@/components/sections/Testimonials";
import VideoTestimonials from "@/components/sections/VideoTestimonials";
import WhyUs from "@/components/sections/WhyUs";
import {
  getCourses,
  getGallery,
  getPlacements,
  getTestimonials,
  getVideoTestimonials,
} from "@/lib/sheets";
import LivePlacementBoard from "@/components/layout/LivePlacementBoard";

export const revalidate = 600;

export default async function Home() {
  const heroImageUrl = process.env.NEXT_PUBLIC_HERO_IMAGE_URL;
  const [courses, testimonials, videos, placements, gallery] = await Promise.all([
    getCourses(),
    getTestimonials(),
    getVideoTestimonials(),
    getPlacements(),
    getGallery(),
  ]);

  return (
    <>
      <PromoBar />
      <Header />
      <main>
        <HeroWithPhoto courses={courses} imageUrl={heroImageUrl} />
        <WhyUs />
        <Courses courses={courses} />
        <CoursePathCarousel courses={courses} />
        <Placements placements={placements} />
        <ImpactMap />
        <Gallery items={gallery} />
        <Testimonials testimonials={testimonials} />
        <VideoTestimonials videos={videos} />
        <Facilities />
        <Associations />
        <FinalCTA courses={courses} />
      </main>
      <LivePlacementBoard />
      <Footer courses={courses} />
      <SmartChatWidget counsellorName="Priya" responseTime="5 minutes" />
    </>
  );
}
