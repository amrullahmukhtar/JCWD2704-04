import ssrMainApi from '@/app/_lib/axios/ssrMainApi';

interface Job {
  id: number;
  title: string;
  description: string;
  location: string;
  posted_date: string;
}

const HeroSection: React.FC = async () => {
  const fetchJobs = async () => {
    try {
      const response = await ssrMainApi().get('/job/');
      const fetchedJobs: Job[] = response.data.data;

      fetchedJobs.sort((a: Job, b: Job) => {
        return (
          new Date(b.posted_date).getTime() - new Date(a.posted_date).getTime()
        );
      });

      return fetchedJobs.slice(0, 5);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  };

  const jobs = await fetchJobs();

  return (
    <section className="hero py-20 bg-gray-100">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Temukan Pekerjaan Impian Anda
        </h1>
        <p className="text-lg mb-8">
          Platform terkemuka untuk mencari pekerjaan di berbagai bidang.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white shadow-md p-4">
              <h3 className="text-xl font-bold mb-2">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.description}</p>
              <p className="text-sm text-gray-600 mt-1">
                Location: {job.location}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Posted Date: {new Date(job.posted_date).toLocaleDateString()}
              </p>
              <a href="#" className="block text-blue-500 text-sm mt-2">
                Lihat Detail
              </a>
            </div>
          ))}
        </div>
        <a
          href="/all-jobs"
          className="inline-block bg-blue-500 text-white px-6 py-3 mt-8 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Lihat Semua Pekerjaan
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
