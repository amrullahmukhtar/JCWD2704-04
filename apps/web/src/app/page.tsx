import DiscoverySection from './_components/landingPageComponent/fetchbylocationComponent/discoverysection';
import FilterSection from './_components/landingPageComponent/filterComponent/filtersection';
import HeroSection from './_components/landingPageComponent/heroComponent/hero';
import { NavbarTogglerSatu } from './_components/navbarComponent/navbarUser/navbar1';

const LandingPage: React.FC = () => {
  return (
    <>
      <NavbarTogglerSatu />
      <div className='bg-gray-100'>
      <FilterSection />
      <HeroSection />
      <DiscoverySection />
      </div>
 
    </>
  );
};

export default LandingPage;
