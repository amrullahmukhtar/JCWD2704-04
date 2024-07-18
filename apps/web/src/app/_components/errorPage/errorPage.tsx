export default function ErrorPage({ code }: { code: number }) {
  let message = '';
  switch (code) {
    case 401:
      message = 'Unauthorized - You are not authorized to view this page.';
      break;
    case 404:
      message = 'Page Not Found - The page you are looking for could not be found.';
      break;
    default:
      message = 'Something Went Wrong - An unexpected error occurred.';
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg w-full md:w-1/2 lg:w-1/3 text-center">
        <h1 className="text-4xl font-bold text-red-500">{code}</h1>
        <p className="text-lg mb-4">{message}</p>
        <p className="mb-4">Please check the URL or try again later.</p>
        <div className="flex justify-center">
          <a
            href="javascript:void(0)"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2 cursor-pointer"
          >
            Go Back
          </a>
          <a
            href="/"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded ml-2"
          >
            Go to Home
          </a>
        </div>
      </div>
    </div>
  );
}
