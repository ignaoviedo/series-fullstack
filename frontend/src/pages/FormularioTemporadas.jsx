import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import seriesService from "../services/series.service";
import temporadasService from "../services/temporadas.service";


const FormularioTemporada = () => {
  const [series, setSeries] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, setError, formState: { errors } } = useForm();
  

  useEffect(() => {
    seriesService.obtenerTodas().then(setSeries);
    if (id){
      temporadasService.obtenerPorId(id).then((temporada) => {
        reset({
          numero: temporada.numero,
          episodios: temporada.episodios,
          anio_estreno: temporada.anio_estreno,
          genero: temporada.genero,
          creador: temporada.creador,
          id_serie: temporada.id_serie
        });
      });
    }
    }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      if (id) {
      await temporadasService.actualizar(id, data);
    } else {
      await temporadasService.crear(data);
    }
    navigate("/temporadas");
    } catch (err){
      const body = err.response?.data || {};
      if (body.error) {
        setError("numero", { type: "server", message: body.error });
      }
    }
  };
    

  return (
    <main className="container px-4 my-5">
      <h3 className="mb-4">{id ? "Editar Temporada" : "Nueva Temporada"}</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="row g-3">

        <div className="col-md-4">
          <label>Numero de temporada:</label>
          <input type="number" {...register("numero", { required: "Campo obligatorio.",
          min: { value: 1, message: "El número de temporada debe ser mayor a 0" }
          })} className="form-control" disabled={Boolean(id)}/>
          {errors.numero && (
            <span className="text-danger">
              {errors.numero.message}
            </span>
          )}
        </div>

        <div className="col-md-4">
          <label>Episodios:</label>
          <input type="number" {...register("episodios", { required: "Campo obligatorio",
            validate: value =>
            (value > 0) ||
            "El número de episodios debe ser mayor a 0"
            })} className="form-control" />
          {errors.episodios && (
            <span className="text-danger">
              {errors.episodios.message}
            </span>
          )}
        </div>

        <div className="col-md-4">
          <label>Año de estreno:</label>
          <input type="number" {...register("anio_estreno", { required: "Campo obligatorio",
            validate: value =>
            (value >= 1900 && value <= new Date().getFullYear()) ||
            `El año debe estar entre 1900 y ${new Date().getFullYear()}`
            })} className="form-control" />
          {errors.anio_estreno && (
            <span className="text-danger">
              {errors.anio_estreno.message}
            </span>
          )}
        </div>

        <div className="col-md-6">
          <label>Género:</label>
          <input type="text" {...register("genero", { required: "Campo obligatorio" })} className="form-control" />
          {errors.genero && (
            <span className="text-danger">
              {errors.genero.message}
            </span>
          )}
        </div>

        <div className="col-md-6">
          <label>Creador:</label>
          <input type="text" {...register("creador", { required: "Campo obligatorio" })} className="form-control" />
          {errors.creador && (
            <span className="text-danger">
              {errors.creador.message}
            </span>
          )}
        </div>

        <div className="col-md-12">
          <label>Serie:</label>
          <select {...register("id_serie", { required: "Campo obligatorio" })} className="form-select" disabled={Boolean(id)}>
            <option value="">Seleccione</option>
            {series.map((s) => (
              <option key={s.id} value={s.id}>{s.titulo}</option>
            ))}
          </select>
          {errors.id_serie && (
            <span className="text-danger">
              {errors.id_serie.message}
            </span>
          )}
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-success">{id ? "Actualizar" : "Crear"}</button>
        </div>
      </form>
    </main>
  );
};

export default FormularioTemporada;