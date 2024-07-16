"use client";
import ChartComponent from "@/app/_components/cardComponent/chartComponent";
import { ITransactionCountStats } from "@/app/_model/chart.model";
import csrMainApi from "@/app/_lib/axios/csrMainApi";
import { useEffect, useState } from "react";
import { useInput } from "@/app/_utils/inputHandlerState";

export default function ChartPage() {
  const date = new Date();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const year = date.getFullYear();

  const [chart, setChart] = useState<ITransactionCountStats[]>([]);
  const { input, setInput, inputHandler } = useInput({
    chart1: `${year}-${month}`,
  });

  async function da() {
    const c = (
      await csrMainApi().get(`/transaction/statis/ly`, {
        params: {
          month: new Date(input.chart1).getMonth() + 1,
          year: new Date(input.chart1).getFullYear(),
        },
      })
    ).data.data;
    setChart(c);
  }

  useEffect(() => {
    async function da() {
      const c = (
        await csrMainApi().get(`/transaction/statis/ly`, {
          params: {
            month: new Date(input.chart1).getMonth() + 1,
            year: new Date(input.chart1).getFullYear(),
          },
        })
      ).data.data;
      setChart(c);
    }
    da();
  }, [input]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex flex-row items-center gap-4 my-6">
        <h1 className="font-bold text-3xl">Input Periode:</h1>
        <input
          type="month"
          id="chart1"
          value={input.chart1}
          onChange={inputHandler}
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="w-full flex justify-center">
        <ChartComponent chart={chart} />
      </div>
    </div>
  );
}
