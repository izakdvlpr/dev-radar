import axios from "axios";

const api = axios.create({
  baseURL: "https://dev-radar-server-deploy.zevdvlpr.repl.co",
});

export default api;
