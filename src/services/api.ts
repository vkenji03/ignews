import axios from "axios";

export const api = axios.create({
  baseURL: '/api' // o axios reaproveita a URL da pagina onde ele eh chamado
});