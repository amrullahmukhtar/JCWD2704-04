"use client"

import { useRouter } from "next/navigation";
import BackEndForm from "./backEndForm";

import React, { ChangeEvent, useState } from 'react'

export default function RatingForm({omdbId}:{omdbId:string}) {
    
    const router = useRouter()
    const [input, setInput] = useState({});
  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    console.log(input)
    setInput({ ...input, [e.target.id]: e.target.value });
  }
  const [rating, setRating] = useState<number | null>(null);

  const handleRatingClick = (value: number) => {
    setRating(value);
    console.log(`Rated ${value}`);
  };

  return (
    <BackEndForm
action="/rating/rt2"
method="post"
onSuccess={()=>{router.refresh()}}
data={{...input,rate: rating, movieId: omdbId}}
>
<div className="flex justify-center items-center ">
      <div className="bg-white w-full shadow-md rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Beri Rating</h2>
        <div className="flex items-center">
          <span className="mr-2">Rating:</span>
          <div className="flex">
            {[...Array(5)].map((_, index) => (
              <button
                key={index}
                className={`mr-2 text-2xl ${
                  rating && index < rating ? 'text-yellow-500' : 'text-gray-400'
                }`}
                onClick={() => handleRatingClick(index + 1)}
              >
                &#9733;
              </button>
            ))}
          </div>
        </div>
        <textarea
        id="comment"
          className="mt-4 w-full border rounded p-2"
          placeholder="Tulis ulasanmu..."
        onChange={inputHandler}
        ></textarea>
        <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
          Submit
        </button>
      </div>
    </div>

</BackEndForm>
  )
}


