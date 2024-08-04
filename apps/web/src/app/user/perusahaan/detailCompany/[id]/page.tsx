import { NavbarTogglerSatu } from '@/app/_components/navbarComponent/navbar1';
import ssrMainApi from '@/app/_lib/axios/ssrMainApi';

type CompanyDetailProps = {
  params: {
    id: string;
  };
};

export default async function CompanyDetail({ params }: CompanyDetailProps) {
  const { id } = params;

  // Fetch company details
  const fetchCompanyDetails = async (companyId: string) => {
    try {
      const response = await ssrMainApi().get(`/admin/ad1/${companyId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching company details:', error);
      return null;
    }
  };

  // Fetch company jobs
  const fetchCompanyJobs = async (companyId: string) => {
    try {
      const response = await ssrMainApi().get(`/job/jobCompany/${companyId}`);
      return response.data.data;
    } catch (error) {
      console.error('Error fetching company jobs:', error);
      return [];
    }
  };

  const [company, jobs] = await Promise.all([
    fetchCompanyDetails(id),
    fetchCompanyJobs(id),
  ]);

  if (!company) {
    return (
      <div className="container mx-auto p-6">
        Error loading company details.
      </div>
    );
  }

  return (
    <>
      <NavbarTogglerSatu />
      <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 min-h-screen">
        <div className="container mx-auto p-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
                {company.company_name}
              </h2>
              <p className="text-lg text-gray-700 mb-2">
                {company.company_summary}
              </p>
              <p className="text-md text-gray-600 mb-2">
                Location: {company.company_location}
              </p>
              <p className="text-md text-gray-600 mb-6">
                Contact:{' '}
                <a
                  href={`mailto:${company.contact_email}`}
                  className="text-blue-500"
                >
                  {company.contact_email}
                </a>
              </p>

              <h3 className="text-3xl font-bold text-gray-800 mb-4">
                Available Jobs
              </h3>
              <ul className="divide-y divide-gray-300">
                {jobs.map((job: any) => (
                  <li
                    key={job.id}
                    className="py-6 px-4 hover:bg-gray-50 transition duration-200"
                  >
                    <h4 className="text-2xl font-semibold text-gray-800">
                      {job.title}
                    </h4>
                    <p className="text-md text-gray-600">{job.location}</p>
                    <a
                      href={`/user/lowongan/${job.id}`}
                      className="text-blue-600 hover:text-blue-800 mt-2 inline-block"
                    >
                      View Details
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
