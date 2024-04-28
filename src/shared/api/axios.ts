import axios from "axios";

const BASE_API_URL = "https://randomuser.me/api/";

export const api = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
