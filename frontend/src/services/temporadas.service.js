import axios from "./axios.config.js";

const obtenerTodos = async () => {
  const response = await axios.get("/temporadas");
  return response.data;
};

const obtenerPorId = async (id) => {
  const response = await axios.get(`/temporadas/${id}`);
  return response.data;
};

const crear = async (temporada) => {
  const response = await axios.post("/temporadas", temporada);
  return response.data;
};

const actualizar = async (id, temporada) => {
  const response = await axios.put(`/temporadas/${id}`, temporada);
  return response.data;
};

const eliminar = async (id) => {
  await axios.delete(`/temporadas/${id}`);
};

const buscarFiltrado = async (filtros) => {
  const params = new URLSearchParams(filtros).toString();
  const response = await axios.get(`/temporadas/filtrar?${params}`);
  return response.data;
};

export default {
  obtenerTodos,
  obtenerPorId,
  crear,
  actualizar,
  eliminar,
  buscarFiltrado,
};