// src/pages/Profile.jsx (Actualizado)
import React, { useState, useEffect } from 'react';
import CompositeBoardCard from '../components/organisms/CompositeBoardCard';
import EditProfileModal from '../components/organisms/EditProfileModal';
import SavedPinCard from '../components/organisms/SavedPinCard'; // <--- Importar el nuevo componente
import ghostImg from '../assets/ghost.jpeg';
import heroImg from '../assets/hero.png';

const Profile = () => {
    // ESTADOS
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('Tableros');
    const [savedPins, setSavedPins] = useState([]);

    // Cargar pines del localStorage
    useEffect(() => {
        if (activeTab === 'Pines') {
            const saved = JSON.parse(localStorage.getItem('savedPins')) || [];
            setSavedPins(saved);
        }
    }, [activeTab]);

    // --- FUNCIÓN PARA ELIMINAR UN PIN ---
    const handleRemovePin = (pinId) => {
        // 1. Filtrar el pin eliminado del estado actual (actualización visual rápida)
        const updatedPins = savedPins.filter(pin => pin.id !== pinId);
        setSavedPins(updatedPins);

        // 2. Actualizar el localStorage con la nueva lista
        localStorage.setItem('savedPins', JSON.stringify(updatedPins));

        // Opcional: una alerta sutil o notificación
        console.log(`Pin ${pinId} eliminado`);
    };

    const myBoards = [
        { id: 1, title: "Fondos", count: 128, imgs: [ghostImg, heroImg, ghostImg] },
        { id: 2, title: "Decoración de cuarto", count: 45, imgs: [heroImg, ghostImg, heroImg] },
        { id: 3, title: "Cortes de cabello", count: 12, imgs: [ghostImg, ghostImg, ghostImg] },
    ];

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 animate-fadeIn">
            {/* ... Header de Perfil ... */}
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

            {/* ... Sistema de Tabs ... */}
            <div className="flex justify-center border-b border-Neutral-100 mb-10 gap-10 font-bold text-CafeSecondary-300">
                <button
                    onClick={() => setActiveTab('Tableros')}
                    className={`pb-4 transition-all ${activeTab === 'Tableros' ? 'border-b-2 border-redPrimary-300 text-CafeSecondary-500' : 'hover:text-redPrimary-300'}`}
                >
                    Tableros
                </button>
                <button
                    onClick={() => setActiveTab('Pines')}
                    className={`pb-4 transition-all ${activeTab === 'Pines' ? 'border-b-2 border-redPrimary-300 text-CafeSecondary-500' : 'hover:text-redPrimary-300'}`}
                >
                    Pines
                </button>
            </div>

            {/* Renderizado Condicional */}
            {activeTab === 'Tableros' ? (
                /* VISTA DE TABLEROS */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {myBoards.map(board => (
                        <CompositeBoardCard key={board.id} title={board.title} itemCount={board.count} images={board.imgs} />
                    ))}
                </div>
            ) : (
                /* VISTA DE PINES (Usando SavedPinCard) */
                <div className="w-full animate-fadeIn">
                    {savedPins.length > 0 ? (
                        <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                            {savedPins.map((pin) => (
                                /* --- REEMPLAZO AQUÍ --- */
                                <SavedPinCard
                                    key={pin.id}
                                    pin={pin}
                                    onRemove={handleRemovePin} // Pasamos la función de eliminar
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-24 text-center">
                            <p className="text-CafeSecondary-200 text-lg font-lato">
                                Aún no has guardado ningún pin.
                            </p>
                        </div>
                    )}
                </div>
            )}

            <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Profile;