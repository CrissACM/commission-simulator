import axios from "axios";

export const disruptiveApi = axios.create({
  baseURL: "https://my.disruptivepayments.io/api",
  headers: {
    "client-api-key": import.meta.env.VITE_CLIENT_API_KEY,
    "content-type": "application/json",
  },
});
