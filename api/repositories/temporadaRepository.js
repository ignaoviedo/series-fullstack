import RepositorioBase from "./repositorioBase.js";
import Temporada from "../models/temporada.js";
import Serie from "../models/serie.js";
import { Op, where } from "sequelize";

class TemporadaRepository extends RepositorioBase {
  constructor() {
    super(Temporada);
  }

  async obtenerTodos({ pagina = 1, limite = 50 } = {}) {
    const offset = (pagina - 1) * limite;
    return this.modelo.findAll({
      limit: limite,
      offset,
      order: [
        ["id", "DESC"]
      ],
      include: {
        model: Serie,
        as: "serie"
      }
    });
  }

  async obtenerPorId(id) {
    return this.modelo.findByPk(id, {
      include: {
        model: Serie,
        as: "serie"
      }
    });
  }

  // Auxiliar
  async obtenerPorNumeroYSerie(num, id) {
    return this.modelo.findOne({
      where: {
        numero: num,
        id_serie: id
      }
    });
  }

  async buscarFiltrado({ titulo, plataforma, genero } = {}) {
    const condicionesSerie = [];
    const condicionesTemporada = {};

    if (titulo) {
      const likeTexto = { [Op.like]: `%${titulo}%` };
      condicionesSerie.push({ titulo: likeTexto });
    }

    if (plataforma) {
      condicionesSerie.push({ plataforma });
    }

    if (genero) {
      condicionesTemporada.genero = { [Op.like]: `%${genero}%` }
    }

    return this.modelo.findAll({
      where: condicionesTemporada,
      include: [{ 
        model: Serie, 
        as: "serie",
        where: { [Op.and]: condicionesSerie }
      }],
      order: [
        [{ model: Serie, as: "serie" }, "titulo", "ASC"],
        ["numero", "ASC"]
      ],
      limit: 50
    });
  }

}

export default new TemporadaRepository();
