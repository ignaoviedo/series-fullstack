import React, { useEffect, useState } from "react";
import { Await, useNavigate } from "react-router-dom";
import temporadasService from "../services/temporadas.service";

const Temporadas = () => {
  const [temporadas, setTemporadas] = useState([]);
  const [filtros, setFiltros] = useState({
    titulo: "",
    plataforma: "",
    genero: ""
  });

  const navigate = useNavigate();

  const cargarTemporadas = async () => {
    const data = await temporadasService.obtenerTodos();
    setTemporadas(data);
  };

  const buscar = async () => {
    const data = await temporadasService.buscarFiltrado(filtros);
    setTemporadas(data);
  };

  const limpiarFiltros = () => {
  setFiltros({ titulo: "", plataforma: "", genero: "" });
  cargarTemporadas();
};

  const eliminar = async (id) => {
    if (confirm("¿Seguro que desea eliminar esta temporada?")) {
      await temporadasService.eliminar(id);
      cargarTemporadas();
    }
  };

useEffect(() => {
  cargarTemporadas();

}, []);

  return (
    <div className="container-fluid px-4 my-4">
      <h2 className="mb-4">Listado de Temporadas</h2>
      <form className="row g-3 mb-4">
        <div className="col-md-4">
          <label className="form-label">Titulo de serie</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por titulo de serie"
            value={filtros.titulo}
            onChange={(e) => setFiltros({ ...filtros, titulo: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Plataforma</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por plataforma"
            value={filtros.plataforma}
            onChange={(e) => setFiltros({ ...filtros, plataforma: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <label className="form-label">Género</label>
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por genero"
            value={filtros.genero}
            onChange={(e) => setFiltros({ ...filtros, genero: e.target.value })}
          />
        </div>
        <div className="col-12 d-flex justify-content-end gap-2">
          <button type="button" className="btn btn-violet" onClick={buscar}>Filtrar</button>
          <button type="button" className="btn btn-secondary" onClick={limpiarFiltros}>Limpiar</button>
        </div>
      </form>

      <table className="table table-striped table-bordered align-middle w-100">
        <thead className="table-dark">
          <tr>
            <th>Serie</th>
            <th>N° Temporada</th>
            <th>Episodios</th>
            <th>Año Estreno</th>
            <th>Genero</th>
            <th>Creador</th>
            <th>Plataforma</th>  
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {temporadas.map((temp) => {
            return (
              <tr key={temp.id}>
                <td>{temp.serie?.titulo}</td>
                <td>{temp.numero}</td>
                <td>{temp.episodios}</td>
                <td>{temp.anio_estreno}</td>
                <td>{temp.genero}</td>
                <td>{temp.creador}</td>
                <td>{temp.serie?.plataforma}</td>
                <td className="text-nowrap">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => navigate(`/temporadas/editar/${temp.id}`)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => eliminar(temp.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Temporadas;