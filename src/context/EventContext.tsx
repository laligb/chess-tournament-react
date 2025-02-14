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
  extendedProps: {
    location: LocationData;
    statistics: StatisticsData;
  };
}

export interface EventsType {
  events: CalendarEvent[];
  refreshEvents: () => void;
}

export const EventContext = createContext<EventsType>({
  events: [],
  refreshEvents: () => {},
});
