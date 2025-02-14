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
        const eventsData = await fetchEvents();

        if (!Array.isArray(eventsData)) {
          console.error("API returned non-array data:", eventsData);
          return;
        }

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
        console.error("Error fetching events:", err);
      }
    };

    getEvents();
  }, []);

  return (
    <div style={{ maxWidth: "600px", height: "100hv" }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        eventClick={(info) => {
          const location = info.event.extendedProps.location;
          alert(
            `Event: ${info.event.title}, Date: ${info.event.start}, Location: ${location.name}`
          );
        }}
      />
    </div>
  );
}

export default CalendarPage;
