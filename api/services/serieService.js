import serieRepository from "../repositories/serieRepository.js";

class SerieService {
  async obtenerTodas() {
    return await serieRepository.obtenerTodas();
  }
}

export default new SerieService();
