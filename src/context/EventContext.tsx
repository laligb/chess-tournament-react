import { createContext } from "react";

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

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;

  location: LocationData;
  statistics: StatisticsData;

  type: string;
  format: string;
}

export interface EventsType {
  events: CalendarEvent[];
  refreshEvents: () => void;
  updateEvent: (id: string, updates: Partial<CalendarEvent>) => Promise<void>;
}

export const EventContext = createContext<EventsType>({
  events: [],
  refreshEvents: () => {},
  updateEvent: async () => {},
});
