import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import TournamentTable from "../components/TournamentTable";
import { useContext } from "react";
import { CalendarEvent, EventContext } from "../context/EventContext";
import ChartBar from "../components/ChartBar";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartPage() {
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

  const colorPalette: string[] = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#C9CBCF",
    "#00A550",
    "#800080",
    "#008080",
  ];
  const backgroundColors: string[] = labels.map(
    (_, idx) => colorPalette[idx % colorPalette.length]
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Tournaments per City",
        data: counts,
        backgroundColor: backgroundColors,
        borderColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="row">
      <div className="col-lg-6 col-md-8 col-sm-12">
        <ChartBar />
        <Doughnut data={data} className="my-2" />
      </div>
      <div className="col-lg-6 col-md-8 col-sm-12">
        <TournamentTable />
      </div>
    </div>
  );
}

export default ChartPage;
