import BrowseService from "@/components/home/browse-service";
import HeroBanner from "@/components/home/hero-banner";
import ServiceCategory from "@/components/home/service-category";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <BrowseService />
      <ServiceCategory />
    </main>
  );
}
