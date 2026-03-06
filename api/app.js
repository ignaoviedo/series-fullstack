import express from 'express';
import sequelize from './db.js';
import temporadasRouter from './routes/temporadas.routes.js';
import seriesRouter from './routes/series.routes.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// Ruta principal de servidor
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Servidor Express</title>
        <style>
          body { background-color:rgba(44, 30, 30, 1); font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; }
          .container { background: #ddd; padding: 2rem; border-radius: 12px; box-shadow: 0 0 12px rgba(0,0,0,0.1); text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Servidor Express Activo</h1>
          <p>API corriendo en <strong>http://localhost:3000</strong></p>
        </div>
      </body>
    </html>
  `);
});

// Agregar endpoints aquí
app
  .use("/api/temporadas", temporadasRouter)
  .use("/api/series", seriesRouter);

// Manejo de errores
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});


(async function start() {
    // Validar conexión a la base de datos.
    await sequelize.authenticate();

    // Iniciar el servidor
    app.listen(PORT, () => {
        console.log(`Servidor iniciado y escuchando en http://localhost:${PORT}`);
    });
})();
