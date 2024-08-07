import { NavbarTogglerSatu } from '@/app/_components/navbarComponent/navbarUser/navbar1';
import ssrMainApi from '@/app/_lib/axios/ssrMainApi';
import Image from 'next/image';

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

  const avatarUrl = company.avatarUrl
    ? `${process.env.NEXT_PUBLIC_BASE_API_URL}${company.avatarUrl}`
    : '/company.svg';

  return (
    <>
      <NavbarTogglerSatu />
      <div className="bg-gradient-to-r from-gray-50 to-gray-200 min-h-screen">
        <div className="container mx-auto p-8">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="flex items-center justify-center w-24 h-24 mt-8 mx-auto">
              <Image
                src={avatarUrl}
                alt={`${company.company_name} logo`}
                width={96}
                height={96}
                className="rounded-full object-cover"
              />
            </div>
            <div className="p-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-6 ">
                {company.company_name}
              </h2>
              <p className="text-lg text-gray-700 mb-4 ">
                {company.company_summary}
              </p>
              <div className=" mb-6">
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold">Location:</span>{' '}
                  {company.company_location}
                </p>
                <p className="text-md text-gray-600 mb-2">
                  <span className="font-semibold">Contact:</span>
                  <a
                    href={`mailto:${company.contact_email}`}
                    className="text-blue-600 hover:underline"
                  >
                    {company.contact_email}
                  </a>
                </p>
              </div>

              <h3 className="text-3xl font-bold text-gray-800 mb-6">
                Available Jobs
              </h3>
              <ul className="space-y-4">
                {jobs.map((job: any) => (
                  <li
                    key={job.id}
                    className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300"
                  >
                    <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                      {job.title}
                    </h4>
                    <p className="text-md text-gray-600 mb-4">{job.location}</p>
                    <a
                      href={`/user/lowongan/${job.id}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
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
