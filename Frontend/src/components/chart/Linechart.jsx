import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

// Register the components you will be using
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyLineChart = () => {
  const theme = useTheme();
  const isScreenUnder1000px = useMediaQuery('(max-width:1000px)');
  const isScreenUnder768px = useMediaQuery('(max-width:768px)');
  const isScreenUnder500px = useMediaQuery('(max-width:500px)');

  const getWidthChart = () => {
    if (isScreenUnder500px) return '99%';
    if (isScreenUnder768px) return '92%';
    if (isScreenUnder1000px) return 'calc(110% - 30px)';
    return 'calc(110% - 30px)';
  };
  const getHeightChart = () => {
    if (isScreenUnder500px) return '99%';
    if (isScreenUnder768px) return '92%';
    if (isScreenUnder1000px) return 'calc(110% - 30px)';
    return 'calc(117% - 30px)';
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Status',
        data: [15, 10,30, 0, 18, 0],
        backgroundColor: 'rgba(255, 255, 255, 0.5)', // Fill color under the line
        borderColor: 'white', // Line color
        borderWidth: 1,
        fill: true,
        tension: 0.4 // Adjust line smoothness
      },
    ],
  };

  const isScreenUnder450px = useMediaQuery('(max-width:450px)');
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // Legend text color
        },
      },
      title: {
        display: true,
        text: 'Your daily sales',
        color: 'white', // Title text color
        padding: {
          top: 10, // Adds margin at the top of the title
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: 'white', // X-axis labels color
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // X-axis grid color
        },
      },
      y: {
        ticks: {
          color: 'white', // Y-axis labels color
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)', // Y-axis grid color
        },
      },
    },
  };

  return (
    <div
      style={{
        width: getWidthChart(),
        height : getHeightChart(),
       
       
        
       
      }}
    >
      <Line
        options={options}
        data={data}
      />
    </div>
  );
};

export default MyLineChart;
