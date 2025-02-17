import { useEffect, useState } from "react";
import { CalendarEvent, EventContext, EventsType } from "./EventContext";
import { fetchEvents } from "../service/eventService";
import axios from "axios";

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

        location: ev.location,
        statistics: ev.statistics,
        type: ev.type,
        format: ev.format,
      }));

      console.log("refreshed events...blablablbalbal");

      setEvents(calendarEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const updateEvent = async (id: string, updates: Partial<CalendarEvent>) => {
    try {
      await axios.put(`http://localhost:5000/api/events/${id}`, updates);

      await refreshEvents();
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  const value: EventsType = { events, refreshEvents, updateEvent };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
