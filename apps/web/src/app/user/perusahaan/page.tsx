import AllCompany from '@/app/_components/companyForUser/allCompany';
import { NavbarTogglerSatu } from '@/app/_components/navbarComponent/navbarUser/navbar1';

const LowonganPage: React.FC = () => {
  return (
    <>
      <NavbarTogglerSatu />
      <div className='min-h-screen'>
        <AllCompany />
      </div>
    </>
  );
};

export default LowonganPage;
