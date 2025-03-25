import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


// Register the components you will be using
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MyChart = () => {

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
    return 'calc(122% - 30px)';
  };
  const data = {
    labels: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    datasets: [
      {
        label: 'Status',
        data: [20, 20, 20, 20, 20, 20],
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 1,
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
        text: 'Daily Active',
        color: 'white',
        padding: {
          top: 18, 
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
        width: getWidthChart() ,
        marginBottom : '8px',
        height :getHeightChart(),
      
      }}
    >
      <Bar
        style={{ height: isScreenUnder450px ? '30vh' : '37vh' }}
        options={options}
        data={data}
      />
    </div>
  );
};

export default MyChart;
