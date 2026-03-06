import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Temporadas from "./pages/Temporadas";
import FormularioTemporadas from "./pages/FormularioTemporadas";
import Encabezado from "./components/Encabezado";
import PiePagina from "./components/PiePagina";


function App() {
  return (
    <BrowserRouter>
      <Encabezado />
      <Routes>
        <Route path="/" element={<Navigate to="/temporadas" />} />
        <Route path="/temporadas" element={<Temporadas />} />
        <Route path="/temporadas/nueva" element={<FormularioTemporadas />} />
        <Route path="/temporadas/editar/:id" element={<FormularioTemporadas />} />
      </Routes>
      <PiePagina />
    </BrowserRouter>
  );
}

export default App;
