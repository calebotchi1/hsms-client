import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`;

export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});
