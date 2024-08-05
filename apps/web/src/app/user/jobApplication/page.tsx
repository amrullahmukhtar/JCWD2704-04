import JobApplications from '@/app/_components/companyForUser/jobApplications';
import { NavbarTogglerSatu } from '@/app/_components/navbarComponent/navbarUser/navbar1';

export default function page() {
  return (
    <>
      <NavbarTogglerSatu />
      <div className='min-h-screen'>
      <JobApplications/>
      </div>

    </>
  );
}
