import FilterLowongan from '@/app/_components/lowonganPageComponent/filterLowongan';
import { NavbarTogglerSatu } from '@/app/_components/navbarComponent/navbar1';

const LowonganPage: React.FC = () => {
  return (
    <>
      <NavbarTogglerSatu />
      <div className="min-h-screen">
        <FilterLowongan />
      </div>
    </>
  );
};

export default LowonganPage;
