import axios from "axios";

const configs = {
  baseURL: "https://pokeapi.co/api/v2",
};

const http = axios.create(configs);

export default http;
