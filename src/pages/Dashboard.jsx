// src/pages/Dashboard.jsx
import React from 'react';
import BoardCard from '../components/organisms/BoardCard';
// IMPORTA TUS IMÁGENES
import ghostImg from '../assets/ghost.jpeg';
import heroImg from '../assets/hero.png';

const Dashboard = () => {
    const tablerosPrueba = [
        {
            id: 1,
            title: "Inspiración Recámara",
            itemCount: 12,
            lastUpdated: "hace 2 días",
            coverImage: ghostImg // <--- AHORA SÍ TIENE IMAGEN
        },
        {
            id: 2,
            title: "Proyecto PintBoard",
            itemCount: 45,
            lastUpdated: "hace 1 hora",
            coverImage: heroImg // <--- AHORA SÍ TIENE IMAGEN
        },
        {
            id: 3,
            title: "Recetas Saludables",
            itemCount: 8,
            lastUpdated: "ayer",
            coverImage: ghostImg // <--- AHORA SÍ TIENE IMAGEN
        },
    ];

    return (
        <div className="animate-fadeIn p-4">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato">Dashboard</h2>
                <p className="text-CafeSecondary-300">Explora tus tableros y descubrimientos visuales.</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tablerosPrueba.map((tablero) => (
                    <BoardCard
                        key={tablero.id}
                        id={tablero.id}
                        title={tablero.title}
                        itemCount={tablero.itemCount}
                        lastUpdated={tablero.lastUpdated}
                        coverImage={tablero.coverImage}
                    />
                ))}
            </div>
        </div>
    );
};

export default Dashboard;