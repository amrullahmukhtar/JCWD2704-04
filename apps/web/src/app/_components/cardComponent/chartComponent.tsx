"use client";

import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ITransactionCountStats } from "@/app/_model/chart.model";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const ChartComponent = ({ chart }: { chart: ITransactionCountStats[] }) => {
  const data = {
    labels: chart.map((e) => e.title),
    datasets: [
      {
        label: "Sales",
        data: chart.map((e) => e.sold),
        backgroundColor: [
          "rgba(75,192,192,0.6)",
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(153,102,255,0.6)",
        ],
      },
    ],
  };
  const options = {
    animation: {
      duration: 2000, // Animation duration in milliseconds
      easing: "easeInOutQuart", // Easing function to use
    },
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart: any) => {
            const data = chart.data;
            return data.labels.map((label: any, i: number) => {
              if (data.datasets[0].data) {
                const value = data.datasets[0].data[i];
                return {
                  text: `${label} `,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: chart.getDatasetMeta(0).data[i].hidden,
                  index: i,
                };
              }
              return {
                text: `${label}`,
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: chart.getDatasetMeta(0).data[i].hidden,
                index: i,
              };
            });
          },
        },
      },
    },
  };

  const pieOptions = {
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
    plugins: {
      legend: {
        labels: {
          generateLabels: (chart: any) => {
            const data = chart.data;
            return data.labels.map((label: any, i: any) => {
              if (data.datasets[0].data) {
                const value = data.datasets[0].data[i];
                const formattedValue = new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(value);
                return {
                  text: `${label} (${formattedValue})`,
                  fillStyle: data.datasets[0].backgroundColor[i],
                  hidden: chart.getDatasetMeta(0).data[i].hidden,
                  index: i,
                };
              }
              return {
                text: `${label}`,
                fillStyle: data.datasets[0].backgroundColor[i],
                hidden: chart.getDatasetMeta(0).data[i].hidden,
                index: i,
              };
            });
          },
        },
      },
    },
  };
  const data1 = {
    labels: chart.map((e) => e.title),
    datasets: [
      {
        label: "Margin",
        data: chart.map((e) => e.total),
        backgroundColor: [
          "rgba(75,192,192,0.6)",
          "rgba(255,99,132,0.6)",
          "rgba(54,162,235,0.6)",
          "rgba(255,206,86,0.6)",
          "rgba(153,102,255,0.6)",
        ],
      },
    ],
  };

  return (
    <>
      <div className="w-full flex-col flex justify-center items-center gap-5 mt-10">
        <div className="w-[50%] ">
          <h1 className=" font-bold text-4xl text-center my-10">
            REPORT SALES
          </h1>
          <div className=" ">
            <Bar data={data} options={options as any} />
          </div>
        </div>
        <div className="w-[50%]">
          <h1 className=" font-bold text-4xl text-center my-10">
            REPORT MARGIN
          </h1>
          <div className=" ">
            <Pie data={data1} options={pieOptions as any} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChartComponent;
