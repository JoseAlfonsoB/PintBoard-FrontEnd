// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage' // <--- Nueva página de presentación
import Dashboard from './pages/Dashboard'
import Crear from './pages/Crear'
import Categorias from './pages/Categorias'
import PinDetail from './pages/PinDetail';
import Profile from './pages/Profile';

const App = () => {
  return (
    <Routes>
      {/* 1. RUTA PÚBLICA: No usa MainLayout porque no lleva Sidebar */}
      <Route path="/" element={<LandingPage />} />

      {/* 2. RUTAS DE ACCESO (Próximamente) */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
      {/* <Route path="/register" element={<RegisterPage />} /> */}

      {/* 3. RUTAS PRIVADAS: Todas envueltas en MainLayout (Dashboard, Perfil, etc.) */}
      <Route path="/app" element={<MainLayout />}>
        {/* Al entrar a /app, redirigimos por defecto al dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="crear" element={<Crear />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="pin/:id" element={<PinDetail />} />
        <Route path="perfil" element={<Profile />} />
      </Route>

      {/* Redirección de seguridad: Cualquier ruta desconocida vuelve a la Landing */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App