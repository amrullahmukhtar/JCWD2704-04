import DiscoverySection from './_components/landingPageComponent/fetchbylocationComponent/discoverysection';
import FilterSection from './_components/landingPageComponent/filterComponent/filtersection';
import HeroSection from './_components/landingPageComponent/heroComponent/hero';
import { NavbarTogglerSatu } from './_components/navbarComponent/navbar1';

const LandingPage: React.FC = () => {
  return (
    <>
      <NavbarTogglerSatu />
      <FilterSection />
      <HeroSection />
      <DiscoverySection />
 
    </>
  );
};

export default LandingPage;
