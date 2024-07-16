import { TMovie } from "@/app/_model/movie.model";
import Image from "next/image";
type props = {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  movie: TMovie;
};
export default function MainMovieCard({ onClick, movie }: props) {
  return (
    <div
      className="min-w-40 w-[250px] md:my-5 bg-white flex flex-col items-center rounded-xl m-auto group"
      onClick={onClick}
    >
      <div className="w-full h-[375px] relative">
        <Image
          src={movie.poster !== "N/A" ? movie.poster : "/placeholder.jpg"}
          alt={movie.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-xl z-0"
        />
      </div>
      <div className="w-full flex flex-col  items-start px-2 mt-2">
        <h1 className="font-bold text-lg text-center w-full h-20 mb-5">
          {movie.title}
        </h1>
        <h1 className="text-gray-500 text-center w-full h-10">{movie.year}</h1>
        <h1 className="text-gray-500 text-center w-full h-10">
          {movie.status === "CommingSoon"
            ? "Coming Soon"
            : movie.status === "CurrentlyPlaying"
            ? "Currently Playing"
            : movie.status}
        </h1>
      </div>
    </div>
  );
}
