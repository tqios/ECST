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

// const Graph = ({ dataPoints }) => {
//   const maxPoints = 600; // 최대 10개의 데이터 포인트 (10분)
//   const labels =
//     dataPoints.length > 0 ? dataPoints.map((_, index) => `${index + 1}s`) : [];

const Graph = ({ dataPoints, active }) => {
  // Added the 'active' prop here
  const maxPoints = 60; // Adjust as needed, 600 for 10 minutes at 1-second intervals
  const labels =
    dataPoints.length > 0 ? dataPoints.map((_, index) => `${index + 1}s`) : [];

  const data = {
    labels: labels.slice(-maxPoints),
    datasets: [
      {
        label: "Concentration",
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
          min: 0, // Y축의 최소값
          max: 100, // Y축의 최대값
          stepSize: 50, // 각 눈금 사이의 간격
        },
        title: {
          display: true,
          text: "Percentage (%)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Time (s)",
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

  // Conditionally render the graph based on the 'active' prop
  return <Line data={data} options={options} />;
  // ) : (
  //   <div>No data available</div>
  // );
};

export default Graph;
