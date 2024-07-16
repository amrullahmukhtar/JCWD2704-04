"use client";

import { useEffect, useState } from "react";
import BackEndForm from "@/app/_components/formComponent/backEndForm";
import MainMovieCard from "@/app/_components/cardComponent/mainMovieCard";
import { TMovie } from "@/app/_model/movie.model";
import csrMainApi from "@/app/_lib/axios/csrMainApi";
// import { debounce } from "@/app/_utils/debounce";

export default function MovieList() {
  const [title, setTitle] = useState("");
  const [movies, setMovies] = useState<TMovie[]>([]);
  const [status, setStatus] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<{
    movie: TMovie;
    index: number;
  } | null>(null);

  async function fetchMovies() {
    try {
      const response = await csrMainApi().get("/movie", {
        params: { ...(title.length ? { title } : {}) },
      });
      setMovies(response.data.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }
  useEffect(() => {
    fetchMovies();
  }, []);

  const [debonce, setDebonce] = useState<NodeJS.Timeout>();
  useEffect(() => {
    clearTimeout(debonce);
    setDebonce(setTimeout(fetchMovies, 500));
  }, [title]);

  return (
    <main className="w-full justify-center items-center min-h-screen py-4">
      <BackEndForm
        data={{ title }}
        action="/movie"
        method="get"
        onSuccess={(response) => setMovies(response.data.data)}
      >
        <div className="w-full flex flex-row gap-5 justify-between px-5">
          <input
            placeholder="Movie title"
            type="text"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            className="border-2 w-full  border-black px-2 py-1 rounded"
          />
          <input
            type="submit"
            className="bg-sky-600 font-semibold hover:bg-sky-300 p-2 rounded text-white"
            value="Submit"
          />
        </div>
      </BackEndForm>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-4">
        {movies.map((movie, index) => (
          <MainMovieCard
            key={index}
            movie={movie}
            onClick={() => setSelectedMovie({ movie, index })}
          />
        ))}
      </div>

      {selectedMovie && (
        <BackEndForm
          action={`/movie/${selectedMovie.movie.omdbId}`}
          data={{ status }}
          method="patch"
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onSuccess={(response) => {
            const updatedMovies = [...movies];
            updatedMovies[selectedMovie.index] = {
              ...selectedMovie.movie,
              status: response.data.data.status,
            };
            setMovies(updatedMovies);
            setSelectedMovie(null);
          }}
          onFail={(error) => alert(error)}
        >
          <div className="bg-white p-5 rounded-lg">
            <h2 className="text-xl mb-4">
              Update Status for {selectedMovie.movie.title}
            </h2>
            <select
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              className="border-2 border-black mb-4 w-full"
              name="status"
              defaultValue={selectedMovie.movie.status}
            >
              <option value="CommingSoon">Coming Soon</option>
              <option value="CurrentlyPlaying">Currently Playing</option>
              <option value="OutOfTheater">Out Of Theater</option>
            </select>
            <div className="flex justify-between">
              <input
                type="submit"
                className="bg-green-600 hover:bg-green-300 p-2 rounded-full"
                value="Submit"
              />
              <div className="flex gap-2">
                <button
                  className="bg-red-600 hover:bg-red-300 p-2 rounded-full"
                  onClick={async (e) => {
                    e.preventDefault();
                    try {
                      await csrMainApi().delete(
                        `/movie/${selectedMovie.movie.omdbId}`
                      );
                      setMovies(
                        movies.filter((_, i) => i !== selectedMovie.index)
                      );
                    } catch (error) {
                      alert(error);
                    }
                    setSelectedMovie(null);
                  }}
                >
                  Delete
                </button>
                <button
                  className="bg-slate-400 hover:bg-slate-300 p-2 rounded-full"
                  onClick={() => setSelectedMovie(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </BackEndForm>
      )}
    </main>
  );
}
