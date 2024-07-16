"use client";
import TicketSelect from "@/app/_components/ticketComponent/ticketSelect";
import { useEffect, useState } from "react";
import { TBranchTicket } from "@/app/_model/branchTicket.model";
import csrMainApi from "@/app/_lib/axios/csrMainApi";

export default function Page() {
  const [tickets, setTicket] = useState<TBranchTicket[]>([]);
  const [filter, setFilter] = useState<{
    omdbid?: string;
    time?: string;
    branch?: string;
  }>({});
  useEffect(() => {
    const ticketFetching = async () => {
      const response = await csrMainApi().get(`/ticket`, { params: filter });
      const tickets: TBranchTicket[] = response.data.data;
      setTicket(tickets);
    };
    ticketFetching();
  }, [filter]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">ticket list</h1>
      {tickets.length ? (
        <TicketSelect studios={tickets} />
      ) : (
        <h1>No Ticket Available</h1>
      )}
    </div>
  );
}
