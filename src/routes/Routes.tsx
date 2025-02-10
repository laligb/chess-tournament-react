import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import MapPage from "../pages/MapPage";
import CalendarPage from "../pages/CalendarPage";
import ChartPage from "../pages/ChartPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/map" element={<MapPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/chart" element={<ChartPage />} />
    </Routes>
  );
};

export default AppRoutes;
