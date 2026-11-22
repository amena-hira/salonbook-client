import BrowseService from "@/components/home/browse-service";
import HeroBanner from "@/components/home/hero-banner";
import JoinWithUs from "@/components/home/join-with-us";
import ServiceCategory from "@/components/home/service-category";
import Footer from "@/components/shared/footer/footer";
import Navbar from "@/components/shared/navbar/navbar";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroBanner />
      <BrowseService />
      <ServiceCategory />
      <JoinWithUs />
      <Footer/>
    </main>
  );
}
