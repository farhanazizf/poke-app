import axios from "axios";

const configs = {
  baseURL: " https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0",
};
// https://virtserver.swaggerhub.com/hanabyan/todo/1.0.0/to-do-list

const http = axios.create(configs);

export default http;
