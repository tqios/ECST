import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Graph = ({ dataPoints }) => {
  const maxPoints = 600; // 최대 10개의 데이터 포인트 (10분)
  const labels =
    dataPoints.length > 0 ? dataPoints.map((_, index) => `${index + 1}s`) : [];

  const data = {
    labels: labels.slice(-maxPoints),
    datasets: [
      {
        label: "집중도",
        data: dataPoints.slice(-maxPoints),
        fill: false,
        backgroundColor: "rgb(75, 192, 192)",
        borderColor: "rgba(75, 192, 192, 0.2)",
        pointRadius: 0,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 50, // 0, 50, 100의 스탭
          max: 100,
          min: 0,
        },
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time",
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default Graph;
