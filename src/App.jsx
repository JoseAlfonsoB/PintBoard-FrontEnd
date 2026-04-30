// src/App.jsx
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import MainLayout from './layouts/MainLayout'
import LandingPage from './pages/LandingPage'
import Dashboard from './pages/Dashboard'
import Crear from './pages/Crear'
import Categorias from './pages/Categorias'
import PinDetail from './pages/PinDetail';
import Profile from './pages/Profile';

// Componente para proteger rutas privadas
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-Neutral-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-redPrimary-300 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-CafeSecondary-300 font-lato">Cargando...</p>
        </div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

const App = () => {
  return (
    <Routes>
      {/* 1. RUTA PÚBLICA: No usa MainLayout porque no lleva Sidebar */}
      <Route path="/" element={<LandingPage />} />

      {/* 2. RUTAS PRIVADAS: Todas envueltas en MainLayout (Dashboard, Perfil, etc.) */}
      <Route path="/app" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      }>
        {/* Al entrar a /app, redirigimos por defecto al dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="crear" element={<Crear />} />
        <Route path="categorias" element={<Categorias />} />
        <Route path="pin/:id" element={<PinDetail />} />
        <Route path="perfil" element={<Profile />} />
      </Route>
      
      {/* RUTAS DE COMPATIBILIDAD (Fuera de /app) */}
      <Route path="/dashboard" element={<Navigate to="/app/dashboard" replace />} />
      <Route path="/perfil" element={<Navigate to="/app/perfil" replace />} />
      
      {/* Redirección de seguridad: Cualquier ruta desconocida vuelve a la Landing */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App