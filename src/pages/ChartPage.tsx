import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function ChartPage() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: ["#FF0000", "#0000FF", "#FFFF00"],
        borderColor: ["#FF0000", "#0000FF", "#FFFF00"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={{ width: "500px", height: "100hv'" }}>
      <Doughnut data={data} />
    </div>
  );
}

export default ChartPage;
