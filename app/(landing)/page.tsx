import { LandingNavbar } from "@/components/landing-navbar";
import Banner from "@/components/banner";
import Work from "@/components/work";
import Mission from "@/components/mission";
import Vision from "@/components/vision";
import Expert from "@/components/expert";
import Values from "@/components/values";
import Newsletter from "@/components/newsletter";
import Footer from "@/components/footer";

export const metadata = {
  title: 'KAICare',
  description: 'KAIcare: Where AI Meets Muscles',
}

const LandingPage = () => {
  return ( 
    <div className="h-full ">
      <LandingNavbar />
      <Banner />
      <Work />
      <Mission />
      <Vision />
      <Values />
      <Expert />
      <Newsletter />
      <Footer />
    </div>
   );
}
 
export default LandingPage;
