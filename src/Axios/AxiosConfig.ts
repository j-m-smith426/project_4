import axios from "axios";

let config = axios.create({
  baseURL: "http://localhost:3000/api/VideoGames",
});

export default config;
