import ApplyJob from '@/app/_components/companyForUser/applyJob';
import { NavbarTogglerSatu } from '@/app/_components/navbarComponent/navbar1';
import ssrMainApi from '@/app/_lib/axios/ssrMainApi';
import { IJob } from '@/app/_model/job.model';

type Props = {
  params: {
    id: string;
  };
};

export default async function DetailJob({ params }: Props) {
  const fetchJobData = async () => {
    try {
      const response = await ssrMainApi().get(`/job/${params.id}`);

      const jobData = response.data.data as IJob;
      return jobData || null;
    } catch (error) {
      console.error('Failed to fetch job data', error);
      return null;
    }
  };

  const job = await fetchJobData();

  if (!job) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-lg text-red-600">Error loading job details.</p>
      </div>
    );
  }

  return (
    <>
      <NavbarTogglerSatu />
      <div className="bg-gradient-to-r  from-gray-100 via-gray-200 to-gray-100 min-h-screen py-12">
        <div className="container mx-auto p-6">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
                {job.title}
              </h1>
              <div className="space-y-4 mb-6">
                <p className="text-xl text-gray-800">
                  <strong className="font-semibold text-gray-700">
                    Company:
                  </strong>{' '}
                  {job.company_name}
                </p>
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-gray-700">
                    Position:
                  </strong>{' '}
                  {job.hire_position}
                </p>
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-gray-700">
                    Description:
                  </strong>{' '}
                  {job.description}
                </p>
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-gray-700">
                    Status:
                  </strong>{' '}
                  {job.status}
                </p>
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-gray-700">
                    Location:
                  </strong>{' '}
                  {job.location}
                </p>
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-gray-700">
                    Category:
                  </strong>{' '}
                  {job.category || 'N/A'}
                </p>
                <p className="text-lg text-gray-600">
                  <strong className="font-semibold text-gray-700">
                    Posted Date:
                  </strong>{' '}
                  {new Date(job.posted_date).toLocaleDateString()}
                </p>
              </div>
            </div>
            <ApplyJob jobId={parseInt(params.id)} job={job} />
          </div>
        </div>
      </div>
    </>
  );
}
