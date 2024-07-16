"use client";
import BackEndForm from "@/app/_components/formComponent/backEndForm";
import csrMainApi from "@/app/_lib/axios/csrMainApi";
import { ChangeEvent, useEffect, useState } from "react";

type Props = {
  params: {
    branchId: string;
    studioId: string;
    time: string;
  };
};

const p = [
  {
    id: 1,
    movieId: "tt6587046",
    seatId: 1,
    time: "2024-06-06T07:00:00.000Z",
    price: 10000,
    seats: { id: 1, studioId: 1, row: "A", number: 1 },
    transactionId: null,
  },
];

export default function Page({ params }: Props) {
  const [tickets, setTickets] = useState<any[]>([]);
  const [studios, setStudios] = useState<any[]>([]);
  const [editInput, setEditInput] = useState<{
    studioId?: number;
    hour?: number;
    minute?: number;
    date?: string;
  }>({});

  function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setEditInput({ ...editInput, [e.target.id]: e.target.value });
  }
  const fetchTicketsByEvent = async () => {
    const data = (
      await csrMainApi().get(`/ticket`, {
        params: {
          studioId: params.studioId,
          time: params.time.replaceAll("%3A", ":"),
        },
      })
    ).data.data as any[];
    setTickets(data);
  };

  useEffect(() => {
    const fetchStudios = async () => {
      const data = await csrMainApi().get(`/branch/${params.branchId}`);
      setStudios(data.data.data.studios);
    };
    fetchTicketsByEvent();
    fetchStudios();
  }, []);

  return (
    <>
      <BackEndForm
        action="/ticket/v3"
        method="patch"
        data={{
          newTickets: tickets.map((e) => ({
            id: e.id,
            // studioId: editInput.studioId,
            time: `${editInput.date}T${editInput.hour}:${editInput.minute}:00.000Z`,
          })),
        }}
        onSuccess={(res) => {}}
      >
        <input type="date" id="date" required onChange={inputHandler} />
        <input
          type="number"
          min={0}
          max={23}
          onChange={inputHandler}
          id="hour"
          required
        />
        <input
          type="number"
          min={0}
          max={59}
          onChange={inputHandler}
          id="minute"
          required
        />
        <select
          defaultValue={params.studioId}
          onChange={inputHandler}
          id="studioId"
        >
          {studios.map((e, i) => (
            <option key={i} value={e.id}>
              {e.studioName}
            </option>
          ))}
        </select>
        <input type="submit" value={"Update"} />
      </BackEndForm>
      <div className="w-full flex flex-col">
        {tickets.map((e, i) => (
          <div key={i}>
            <h1>{e.id}</h1>
            <h1>{e.time}</h1>
          </div>
        ))}
      </div>
    </>
  );
}
