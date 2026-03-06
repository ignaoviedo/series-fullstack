import RepositorioBase from "./repositorioBase.js";
import Serie from "../models/serie.js";

class SerieRepository extends RepositorioBase {
  constructor() {
    super(Serie);
  }

  async obtenerTodas() {
    return this.modelo.findAll({
      order: [["titulo", "ASC"]]
    });
  }
}

export default new SerieRepository();
