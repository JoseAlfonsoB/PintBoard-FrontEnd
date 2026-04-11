// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

// Placeholders para las nuevas páginas
const Dashboard = () => <h2 className="text-2xl font-bold font-lato">Panel de Dashboard</h2>
const Crear = () => <h2 className="text-2xl font-bold font-lato">Crear Nuevo Tablero</h2>
const Categorias = () => <h2 className="text-2xl font-bold font-lato">Explorar Categorías</h2>

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        {/* Actualizamos los paths aquí */}
        <Route path="crear" element={<Crear />} />
        <Route path="categorias" element={<Categorias />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App