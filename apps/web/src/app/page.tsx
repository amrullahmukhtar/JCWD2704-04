import DiscoverySection from './_components/landingPageComponent/fetchbylocationComponent/discoverysection';
import FilterSection from './_components/landingPageComponent/filterComponent/filtersection';
import HeroSection from './_components/landingPageComponent/heroComponent/hero';

const LandingPage: React.FC = () => {
  return (
    <>
      <FilterSection />
      <HeroSection />
      <DiscoverySection />
    </>
  );
};

export default LandingPage;
