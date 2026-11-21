import BrowseService from "@/components/home/browse-service";
import HeroBanner from "@/components/home/hero-banner";
import JoinWithUs from "@/components/home/join-with-us";
import ServiceCategory from "@/components/home/service-category";

export default function Home() {
  return (
    <main>
      <HeroBanner />
      <BrowseService />
      <ServiceCategory />
      <JoinWithUs />
    </main>
  );
}
