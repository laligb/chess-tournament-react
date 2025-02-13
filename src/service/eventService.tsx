import { getEvents } from "../api/eventApi";

export const fetchEvents = () => {
  return getEvents().then((data) => {
    return data.filter;
  });
};
