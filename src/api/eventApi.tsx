import axios from "axios";
import { CalendarEvent } from "../context/EventContext";

// axios.defaults.headers.common["Content-Type"] = "application/json";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/events";

export const getEvents = async (): Promise<Event> => {
  return axios
    .get(API_URL)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};

export const updateEvent = async (
  id: string,
  updates: Partial<CalendarEvent>
): Promise<CalendarEvent> => {
  const response = await axios.put(`${API_URL}/${id}`, updates, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const deleteEvent = async (id: string): Promise<{ message: string }> => {
  const response = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
