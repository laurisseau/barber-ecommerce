import { Line, Doughnut } from 'react-chartjs-2';
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
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Filler,
  ArcElement,
  Tooltip
);

export default function LineChart({ data, chartType, goal }) {
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


  const doughnutOptions = {
    responsive: true,
    plugins: {
      doughnutCenterText: {
        text: 'Center Text', // The text to display in the middle of the doughnut
        color: '#000000', // The color of the text
        font: {
          size: '20', // The font size of the text
          weight: 'bold', // The font weight of the text
        },
      },
    },
  };



  return (
    <div className="line-chart ">
      <div className="">
        {chartType === 'line' ? (
          <Line className=" " options={options} data={data} />
        ) : (
          <div>
            <div className='mt-4 ms-0'><h3>{`Goal of $${goal} today`}</h3></div>
          <div className="d-flex justify-content-center ">
            
            <Doughnut
              className="w-50 h-50 "
              options={doughnutOptions}
              data={data}
            />
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
