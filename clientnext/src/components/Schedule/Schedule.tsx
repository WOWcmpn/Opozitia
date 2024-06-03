import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { useEffect, useState } from "react";
import { ISchedule } from "@/types/types";

ChartJs.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend)

export default function Schedule({labels, data}: ISchedule) {
  const [chartData, setChartData] = useState<any>({datasets: []});
  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    setChartData({
      labels: labels,
      datasets: [
        {
          label: 'EUR/USD',
          data: data,
          backgroundColor: 'rgb(13, 152, 186)',
          borderColor: 'rgb(13, 152, 186)',
          fill: true,
          lineTension: 0.5
      },]
    })
    setChartOptions({
      plugins: {
        legend: {
          display: false
        },
      },
    })
  }, [labels, data]);

  return (
    <>
      <div>
        <Line data={chartData} options={chartOptions} />
      </div>
    </>
  )
}