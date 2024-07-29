import DiscoverySection from './_components/landingPageComponent/fetchbylocationComponent/discoverysection';
import FilterSection from './_components/landingPageComponent/filterComponent/filtersection';
import HeroSection from './_components/landingPageComponent/heroComponent/hero';
import { NavbarToggler } from './_components/navbarComponent/navbar';

const LandingPage: React.FC = () => {
  return (
    <>
      <NavbarToggler />
      <FilterSection />
      <HeroSection />
      <DiscoverySection />
 
    </>
  );
};

export default LandingPage;
