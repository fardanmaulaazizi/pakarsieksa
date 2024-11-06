"use client";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Line = dynamic(() => import("react-chartjs-2").then((mod) => mod.Line), {
  ssr: false,
});

const LineChart = ({
  values,
}: {
  values: { labels: string[]; data: number[] };
}) => {
  const data = {
    labels: values.labels,
    datasets: [
      {
        label: "Sales Report",
        data: values.data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };
  return (
    <div>
      <Line data={data} />
    </div>
  );
};
export default LineChart;
