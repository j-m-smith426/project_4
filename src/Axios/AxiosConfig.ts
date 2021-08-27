import axios from "axios";

let config = axios.create({
  baseURL: "http://192.168.0.96:3000/api/VideoGames",
});

export default config;
