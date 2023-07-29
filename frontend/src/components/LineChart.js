import { Line } from 'react-chartjs-2';
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
} from 'chart.js';

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

export default function LineChart({ data }) {
  //console.log(data)
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
    elements: {
      line: {
        tension: 0.2, // Control the curvature of the lines (0 is linear, 1 is very curvy)
        borderJoinStyle: 'round', // Make the line segments rounded for a wavy appearance
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // Remove the grid lines for the x-axis
        },
      },
      y: {
        ticks: {
          // Use a callback function to format the y-axis ticks with dollar signs
          callback: (value) => `$${value}`,
        },
        grid: {
          display: false, // Remove the grid lines for the y-axis
        },
      },
    },
  };

  return (
    <div className="line-chart ">
      <div className="">
        <Line className=" " options={options} data={data} />
      </div>
    </div>
  );
}
