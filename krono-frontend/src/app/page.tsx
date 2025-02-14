import HeroBanner from "./landing/components/HeroBanner/HeroBanner";
import LandingLayout from "./landing/components/Layout/LandingLayout";

export default function Home() {
  return (
    <LandingLayout>
      <HeroBanner />
    </LandingLayout>
  );
}
