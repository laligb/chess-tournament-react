import { getEvents } from "../api/eventApi";

export const fetchEvents = () => {
  return getEvents().then((data) => {
    console.log("API Response in fetchEvents:", data);
    return data;
  });
};
