// src/pages/Profile.jsx
//import React from 'react';
import CompositeBoardCard from '../components/organisms/CompositeBoardCard';
import React, { useState } from 'react'; // Paso 1: Importar useState
import EditProfileModal from '../components/organisms/EditProfileModal';
// Importa tus imágenes de assets aquí
import ghostImg from '../assets/ghost.jpeg';
import heroImg from '../assets/hero.png';

const Profile = () => {
    const myBoards = [
        { id: 1, title: "Fondos", count: 128, imgs: [ghostImg, heroImg, ghostImg] },
        { id: 2, title: "Decoración de cuarto", count: 45, imgs: [heroImg, ghostImg, heroImg] },
        { id: 3, title: "Cortes de cabello", count: 12, imgs: [ghostImg, ghostImg, ghostImg] },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 animate-fadeIn">
            {/* Header de Perfil (Lo que ya tenías) */}
            <header className="flex flex-col items-center text-center mb-12">
                <div className="w-32 h-32 rounded-full bg-Neutral-200 mb-4 overflow-hidden border-4 border-white shadow-sm">
                    <img src={ghostImg} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-4xl font-bold text-CafeSecondary-500 font-lato mb-1">
                    Jose Alfonso Bautista Arteaga
                </h2>
                <p className="text-CafeSecondary-300 font-lato mb-6">
                    @josealfonso_ba · siguiendo a 0
                </p>

                <div className="flex gap-3">
                    <button className="px-6 py-2.5 bg-redPrimary-300 text-white rounded-full font-bold hover:bg-redPrimary-400 transition-colors">
                        Compartir perfil
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-2.5 bg-Neutral-100 text-CafeSecondary-500 rounded-full font-bold hover:bg-Neutral-200 transition-colors"
                    >
                        Editar perfil
                    </button>
                </div>
            </header>

            {/* Sistema de Tabs (Átomo TabSystem) */}
            <div className="flex justify-center border-b border-Neutral-100 mb-10 gap-10 font-bold text-CafeSecondary-300">
                <button className="pb-4 border-b-2 border-redPrimary-300 text-CafeSecondary-500">Tableros</button>
                <button className="pb-4 hover:text-redPrimary-300 transition-colors">Pines</button>
                <button className="pb-4 hover:text-redPrimary-300 transition-colors">Collages</button>
            </div>

            {/* Grid de Contenido */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                {myBoards.map(board => (
                    <CompositeBoardCard
                        key={board.id}
                        title={board.title}
                        itemCount={board.count}
                        images={board.imgs}
                    />
                ))}
            </div>
            {/* Renderizar el Modal */}
            <EditProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Profile;