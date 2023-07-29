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

export default function LineChart() {
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

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Sales',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: [25, 32, 30, 40, 35, 45],
        fill: true, // Enable the fill option to add the background color under the line
        backgroundColor: (context) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) {
            // This case happens on initial chart load
            return null;
          }
          const gradient = ctx.createLinearGradient(
            chartArea.left,
            chartArea.bottom, // The gradient will start from the bottom
            chartArea.left,
            chartArea.top // And extend to the top
          );
          gradient.addColorStop(1, 'rgba(54, 162, 235, 0.3)');
          gradient.addColorStop(0, 'rgb(255, 255, 255)');
          return gradient;
        },
      },
    ],
  };

  return (
    <div className="line-chart mt-5 d-flex justify-content-center">
      <div className='w-75'>
        <Line className=' ' options={options} data={data} />
      </div>
    </div>
  );
}
