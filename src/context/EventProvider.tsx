import { useEffect, useState } from "react";
import { CalendarEvent, EventContext, EventsType } from "./EventContext";
import { fetchEvents } from "../service/eventService";

import {
  updateEvent as apiUpdateEvent,
  deleteEvent as apiDeleteEvent,
} from "../api/eventApi";

export const EventProvider = ({ children }: { children: React.ReactNode }) => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  const refreshEvents = async () => {
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

      setEvents(calendarEvents);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  const updateEvent = async (id: string, updates: Partial<CalendarEvent>) => {
    try {
      await apiUpdateEvent(id, updates);
      await refreshEvents();
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  const deleteEvent = async (id: string) => {
    try {
      await apiDeleteEvent(id);
      await refreshEvents();
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  useEffect(() => {
    refreshEvents();
  }, []);

  const value: EventsType = { events, refreshEvents, updateEvent, deleteEvent };
  return (
    <EventContext.Provider value={value}>{children}</EventContext.Provider>
  );
};
