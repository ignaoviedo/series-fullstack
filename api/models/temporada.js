import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import Serie from "./serie.js";

class Temporada extends Model {}

Temporada.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id"
    },
    id_serie: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "idSerie"
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "numero"
    },
    episodios: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "episodios"
    },
    anio_estreno: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "anioEstreno"
    },
    genero: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "genero"
    },
    creador: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "creador"
    }
  },
  {
    sequelize,
    modelName: "Temporada",
    tableName: "Temporadas",
    timestamps: false
  }
);

// Asociación
Temporada.belongsTo(Serie, {
  foreignKey: "id_serie",
  as: "serie"
});

// Comentado a propósito por la cantidad de juegos que podría llegar a cargar una plataforma.
// Serie.hasMany(Temporada, {
//   foreignKey: "idSerie",
//   as: "temporadas"
// });

export default Temporada;
