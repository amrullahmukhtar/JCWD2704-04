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
      // Assume response.data.data is an array and we need the first item
      const jobArray = response.data.data as IJob[];
      return jobArray[0] || null; // Return the first item or null if array is empty
    } catch (error) {
      console.error('Failed to fetch job data', error);
      // Handle the error appropriately
      return null;
    }
  };

  const job = await fetchJobData();
  console.log(job, 'ini job');

  if (!job) {
    return <div>Error loading job details.</div>;
  }

  return (
    <>
      <NavbarTogglerSatu />
      <div className="min-h-screen bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100">
        <div className="container mx-auto p-6">
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {job.title}
              </h1>
              <p className="text-xl text-gray-700 mb-4">
                <strong className="text-gray-900">Company:</strong>{' '}
                {job.company_name}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                <strong className="text-gray-900">Position:</strong>{' '}
                {job.hire_position}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                <strong className="text-gray-900">Description:</strong>{' '}
                {job.description}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                <strong className="text-gray-900">Status:</strong> {job.status}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                <strong className="text-gray-900">Location:</strong>{' '}
                {job.location}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                <strong className="text-gray-900">Category:</strong>{' '}
                {job.category || 'N/A'}
              </p>
              <p className="text-lg text-gray-600 mb-4">
                <strong className="text-gray-900">Posted Date:</strong>{' '}
                {new Date(job.posted_date).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-center items-center">
              <button className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
