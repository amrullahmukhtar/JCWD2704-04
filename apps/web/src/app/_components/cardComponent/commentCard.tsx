import ssrMainApi from "@/app/_lib/axios/ssrMainApi";
import { TComment } from "@/app/_model/rating.model";

export default async function CommentsPage({ omdbId }: { omdbId: string }) {
  const comments: TComment[] = (
    await ssrMainApi().get(`/rating/movie/${omdbId}`)
  ).data.data;

  return (
    <div className=" w-full p-6 bg-white rounded-lg shadow-lg ">
      <h1 className="text-xl font-bold w-full">Comments</h1>
      <div className="grid gap-4 w-full my-2">
        {comments.map((result, i) => (
          <div key={i} className="bg-gray-100 p-4 rounded-md w-full">
            <h2 className="text-lg font-semibold">{result.user?.username}</h2>
            <p className="text-sm text-gray-500">{result.movie?.title}</p>
            <p className="text-gray-600">{result.comment}</p>

            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`mr-2 text-2xl ${
                    index < result.rate ? "text-yellow-500" : "text-gray-400"
                  }`}
                >
                  &#9733;
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
