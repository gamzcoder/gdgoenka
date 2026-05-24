import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import PromoBar from "@/components/layout/PromoBar";
import Associations from "@/components/sections/Associations";
import Courses from "@/components/sections/Courses";
import Facilities from "@/components/sections/Facilities";
import FinalCTA from "@/components/sections/FinalCTA";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Placements from "@/components/sections/Placements";
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

export const revalidate = 600;

export default async function Home() {
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
        <Hero courses={courses} />
        <WhyUs />
        <Courses courses={courses} />
        <Placements placements={placements} />
        <Gallery items={gallery} />
        <Testimonials testimonials={testimonials} />
        <VideoTestimonials videos={videos} />
        <Facilities />
        <Associations />
        <FinalCTA courses={courses} />
      </main>
      <Footer courses={courses} />
    </>
  );
}
