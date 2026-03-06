import express from "express";
import temporadaService from "../services/temporadaService.js";

const router = express.Router();

// CRUD
router.get("/", async (req, res) => {
  try {
    const { pagina, limite } = req.query;
    const temporadas = await temporadaService.obtenerTodos({ pagina, limite });
    res.status(200).json(temporadas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.post("/", async (req, res) => {
  try {
    const temporadaCreada = await temporadaService.crear(req.body);
    res.status(201).json(temporadaCreada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const temporadaActualizada = await temporadaService.actualizar(parseInt(req.params.id), req.body);
    res.status(200).json(temporadaActualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await temporadaService.eliminar(parseInt(req.params.id));
    res.status(204).end();
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

// Filtrado
router.get("/filtrar", async (req, res) => {
  try {
    const temporadas = await temporadaService.buscarFiltrado(req.query);
    res.status(200).json(temporadas);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const temporada = await temporadaService.obtenerPorId(parseInt(req.params.id));
    if (!temporada) return res.status(404).json({ error: "Temporada no encontrada." });
    res.status(200).json(temporada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;

