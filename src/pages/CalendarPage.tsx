import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { fetchEvents } from "../service/eventService";
import { useEffect, useState } from "react";

interface LocationData {
  _id?: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface StatisticsData {
  _id?: string;
  players: number;
  wins: number;
  losses: number;
  draws: number;
  games: number;
}

interface EventFromAPI {
  _id: string;
  title: string;
  date: Date;
  location: LocationData;
  statistics: StatisticsData;
}

interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  extendedProps: {
    location: LocationData;
    statistics: StatisticsData;
  };
}

function CalendarPage() {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    const getEvents = async () => {
      try {
        const eventsData: EventFromAPI[] = await fetchEvents();

        const calendarEvents: CalendarEvent[] = eventsData.map((ev) => ({
          id: ev._id,
          title: ev.title,
          date: ev.date.toString(),
          extendedProps: {
            location: ev.location,
            statistics: ev.statistics,
          },
        }));
        setEvents(calendarEvents);
      } catch (err) {
        console.error(err);
      }
    };
    getEvents();
  }, []);

  return (
    <div style={{ width: "500px", height: "100hv" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={events}
      />
    </div>
  );
}

export default CalendarPage;
