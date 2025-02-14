import { useEffect, useState } from "react";
import { CalendarEvent, EventContext, EventsType } from "./EventContext";
import { fetchEvents } from "../service/eventService";

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const refreshEvents = async () => {
    console.log("Refreshing events...blablablbalbal");
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

      console.log("refreshed events...blablablbalbal");

      setEvents(calendarEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  const value: EventsType = { events, refreshEvents };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
