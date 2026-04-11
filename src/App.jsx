// src/App.jsx
import React from 'react';
import Sidebar from './components/organisms/Sidebar';
import TopBar from './components/organisms/TopBar';
import BoardCard from './components/organisms/BoardCard';

const App = () => {
  // Datos de prueba (Mock Data)
  const tablerosPrueba = [
    { id: 1, title: "Inspiración Recámara", itemCount: 12, lastUpdated: "hace 2 días" },
    { id: 2, title: "Proyecto PintBoard", itemCount: 45, lastUpdated: "hace 1 hora" },
    { id: 3, title: "Recetas Saludables", itemCount: 8, lastUpdated: "ayer" },
    { id: 4, title: "UI Design Patterns", itemCount: 24, lastUpdated: "hace 1 semana" },
  ];

  return (
    <div className="flex min-h-screen bg-Neutral-50">
      <Sidebar />

      <div className="flex-1 ml-64 flex flex-col">
        <TopBar />

        <main className="p-8">
          <header className="mb-8 flex justify-between items-end">
            <div>
              <h2 className="text-2xl font-bold text-CafeSecondary-500 font-lato">Tus Tableros</h2>
              <p className="text-CafeSecondary-300">Organiza tus ideas y proyectos visuales.</p>
            </div>
          </header>

          {/* Grid de Organismos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {tablerosPrueba.map((tablero) => (
              <BoardCard
                key={tablero.id}
                title={tablero.title}
                itemCount={tablero.itemCount}
                lastUpdated={tablero.lastUpdated}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;