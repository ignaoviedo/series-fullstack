import temporadaRepository from "../repositories/temporadaRepository.js";
import serieRepository from "../repositories/serieRepository.js";
import RepositorioBase from "../repositories/repositorioBase.js";

class TemporadaService {
  async obtenerTodos({ pagina = 1, limite = 50 } = {}) {
    const temporadas = await temporadaRepository.obtenerTodos({ pagina, limite });
    return temporadas.map(this.#convertirSalida);
  }
  

  async obtenerPorId(id) {
    const temporada = await temporadaRepository.obtenerPorId(id);
    return temporada ? this.#convertirSalida(temporada) : null;
  }

  async crear(datos) {
    await this.#validarNumeroTemporada(datos.numero, datos.id_serie);
    await this.#validarAnioEstreno(datos.anio_estreno);
    await this.#validarEpisodios(datos.episodios);
    await this.#validarTemporadaMay(datos.numero);
    const creado = await temporadaRepository.crear(datos);
    return this.#convertirSalida(creado);
  }

  async actualizar(id, datos) {
    // await this.#validarNumeroTemporada(datos.numero, datos.id_serie);
    await this.#validarAnioEstreno(datos.anio_estreno);
    await this.#validarEpisodios(datos.episodios);
    const actualizado = await temporadaRepository.actualizar(id, datos);
    return this.#convertirSalida(actualizado);
  }

  async eliminar(id) {
    return await temporadaRepository.eliminar(id);
  }

  async buscarFiltrado(filtros) {
    const temporadas = await temporadaRepository.buscarFiltrado(filtros);
    return temporadas.map(this.#convertirSalida);
  }

  // Funciones privadas

  #convertirSalida(temporada) {
    return temporada.toJSON();
  }


  // Validaciones
  // Mal nombre, pero es temporada repetida
  async #validarNumeroTemporada(numero, id_serie) {
    const temporadaExistente = await temporadaRepository.obtenerPorNumeroYSerie(numero, id_serie);
    if (temporadaExistente) {
      throw new Error(`Ya existe la temporada ${numero} para la serie seleccionada[${id_serie}].`);
    }
  }

  async #validarAnioEstreno(anio_estreno) {
    const anioActual = new Date().getFullYear();
    if (anio_estreno < 1900 || anio_estreno > anioActual) {
      throw new Error("Año inválido: debe estar entre 1900 y el año actual.");
    }
  }

  // Mal nombre por la anterior, es validar que sea mayor a 0 el numero.
  async #validarTemporadaMay(numero) {
    if (numero <= 0) {
      throw new Error("El número de temporada no puede ser 0 o menor a 0")
    }
  }

  async #validarEpisodios(episodios) {
    if (episodios <= 0) {
      throw new Error("La cantidad de espisodios debe ser mayor a 0")
    }
  }
}

export default new TemporadaService();
