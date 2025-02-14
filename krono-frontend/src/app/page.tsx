import HeroBanner from "./landing/components/HeroBanner/HeroBanner";
import LandingLayout from "./landing/components/Layout/LandingLayout";
import OurSupportedToken from "./landing/components/SellingPoint/OurSupportedToken";
import SellingPointMarket from "./landing/components/SellingPoint/SellingPointMarket";

export default function Home() {
  return (
    <LandingLayout>
      <HeroBanner />
      <SellingPointMarket />
      <OurSupportedToken />
    </LandingLayout>
  );
}
