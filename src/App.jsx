// src/App.jsx
import React from 'react';
import SearchBar from './components/molecules/SearchBar';
import NavItem from './components/molecules/NavItem';
import UserSummary from './components/molecules/UserSummary';
import { Home, LayoutGrid, Settings } from 'lucide-react';

const App = () => {
  return (
    <section className="flex flex-col gap-4 p-4 border border-Neutral-200 rounded-lg">
      <h2 className="font-lato font-bold text-CafeSecondary-400">Prueba de Moléculas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-xs uppercase text-Neutral-400">Barra de Búsqueda</h3>
          <SearchBar />

          <h3 className="text-xs uppercase text-Neutral-400 mt-4">Perfil de Usuario</h3>
          <UserSummary name="Alfonso B." role="Frontend Developer" />
        </div>

        <div className="flex flex-col gap-2 bg-white p-4 rounded-lg shadow-sm max-w-xs">
          <h3 className="text-xs uppercase text-Neutral-400 mb-2">Menú de Navegación</h3>
          <NavItem Icon={Home} label="Dashboard" isActive={true} />
          <NavItem Icon={LayoutGrid} label="Mis Tableros" />
          <NavItem Icon={Settings} label="Configuración" />
        </div>
      </div>
    </section>
  );
};

export default App;