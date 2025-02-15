import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { JSX, useContext } from "react";
import { EventContext, CalendarEvent } from "../context/EventContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function ChartBar(): JSX.Element {
  const { events } = useContext(EventContext);

  const locationCounts: Record<string, number> = events.reduce(
    (acc: Record<string, number>, event: CalendarEvent) => {
      const locationName = event.location.name;
      if (locationName) {
        acc[locationName] = (acc[locationName] || 0) + 1;
      }
      return acc;
    },
    {}
  );

  const labels: string[] = Object.keys(locationCounts);
  const counts: number[] = Object.values(locationCounts);

  const data = {
    labels,
    datasets: [
      {
        label: "Tournaments per City",
        data: counts,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Tournament Distribution by City",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "City",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Tournaments",
        },
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="mt-5">
      <h2 className="text-center">Tournament Distribution</h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ChartBar;
