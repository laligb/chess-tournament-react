import axios from "axios";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api/events";

export const getEvents = () => {
  return axios
    .get(API_URL)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
};
