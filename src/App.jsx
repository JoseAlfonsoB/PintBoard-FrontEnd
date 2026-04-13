// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Dashboard from './pages/Dashboard'
import Crear from './pages/Crear'
import Categorias from './pages/Categorias'
import PinDetail from './pages/PinDetail';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="crear" element={<Crear />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="pin/:id" element={<PinDetail />} /> {/* <--- NUEVA RUTA DINÁMICA */}
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App