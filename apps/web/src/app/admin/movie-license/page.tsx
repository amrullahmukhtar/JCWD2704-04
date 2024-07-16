"use client";

import { useState } from "react";
import Image from "next/image";
import { omdbAPI } from "@/app/_lib/axios/omdbApi";
import csrMainApi from "@/app/_lib/axios/csrMainApi";

type searchData = {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  added?: boolean; // Menambahkan properti 'added' untuk menandai apakah film telah ditambahkan
};

export default function AdminLogin() {
  const [data, setData] = useState<searchData[]>([]);
  const [input, setInput] = useState({ title: "", page: 1 });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);

  async function omdbFetch(title: string, page: number) {
    setLoading(true);
    const result = (
      await omdbAPI.get("", {
        params: {
          s: title,
          page,
        },
      })
    ).data as { Search: searchData[] };

    if (result.Search) {
      setData(result.Search);
    }
    setLoading(false);
  }

  async function addMovie(imdbID: string) {
    setLoading(true);
    const response = await (
      await csrMainApi().post(`/movie/${imdbID}`)
    ).data.data;
    if (response) {
      setMessage("Success Add");
      const newData = data.map((movie) => {
        if (movie.imdbID === imdbID) {
          return { ...movie, added: true };
        }
        return movie;
      });
      setData(newData);
    } else {
      setMessage("Failed");
    }
    setLoading(false);
  }

  return (
    <div className="w-full justify-center items-center min-h-screen  p-4">
      <div className="flex justify-center flex-col sm:flex-row gap-2 m-auto flex-wrap px-2">
        <div className="w-full flex flex-col">
          <input
            placeholder="Movie title"
            type="text"
            id="title"
            className="border-2 border-black px-2 py-1 rounded"
            value={input.title}
            onChange={(e) => {
              setInput({ ...input, [e.target.id]: e.target.value });
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") omdbFetch(input.title, input.page);
            }}
          />

          <div className="flex w-full gap-x-4 p-2 items-center justify-center text-center">
            <button
              className={`p-2 border-2 border-black rounded ${
                input.page === 1 ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => {
                if (input.page > 1) {
                  setInput((prev) => ({ ...prev, page: prev.page - 1 }));
                  omdbFetch(input.title, input.page - 1);
                }
              }}
            >
              Prev
            </button>
            <div className="text-center flex items-center justify-center py-2">
              {input.page}
            </div>
            <button
              className="p-2 border-2 border-black rounded"
              onClick={() => {
                setInput((prev) => ({ ...prev, page: prev.page + 1 }));
                omdbFetch(input.title, input.page + 1);
              }}
            >
              Next
            </button>
          </div>
        </div>
        <button
          className="bg-sky-600 hover:bg-sky-300 font-semibold p-2 w-max m-auto rounded text-white"
          onClick={() => omdbFetch(input.title, input.page)}
        >
          Search
        </button>
      </div>

      {loading && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-4 py-2 rounded-md shadow-md z-50">
          Loading...
        </div>
      )}

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {data.map((e, i) => (
          <div
            className="w-[250px] bg-white flex flex-col items-center rounded-xl shadow-md p-4"
            key={i}
          >
            <div className="w-full h-[375px] relative">
              <Image
                src={e.Poster !== "N/A" ? e.Poster : "/default-poster.png"}
                alt={e.Title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-xl z-0"
              />
            </div>
            <div className="w-full flex flex-col  items-start px-2 mt-2">
              <h1 className="font-bold text-lg text-center w-full h-20 mb-5">
                {e.Title}
              </h1>
              <p className="text-gray-500 text-center w-full h-10 ">{e.Year}</p>
              {/* Tambahkan kondisi untuk menampilkan tombol sesuai status film */}
              {e.added ? (
                <button
                  className="p-2 w-max m-auto rounded text-white bg-blue-600"
                  disabled
                >
                  Film Added
                </button>
              ) : (
                <button
                  className={`p-2 w-max m-auto rounded text-white ${
                    loading
                      ? "bg-blue-600"
                      : message === "Success Add"
                      ? "bg-green-600"
                      : message === "Failed"
                      ? "bg-red-600"
                      : "bg-green-600 hover:bg-green-300"
                  }`}
                  onClick={() => addMovie(e.imdbID)}
                >
                  {loading ? "Adding..." : "Add Movie"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
