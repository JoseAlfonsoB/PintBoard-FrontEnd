// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import BoardCard from '../components/organisms/BoardCard';
import { pinService, imageService } from '../services/api';

const Dashboard = () => {
    const [pins, setPins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPins = async () => {
            try {
                setLoading(true);
                const data = await pinService.getAllPins();
                setPins(data || []);
            } catch (err) {
                console.error('Error al cargar pines:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPins();
    }, []);

    if (loading) {
        return (
            <div className="animate-fadeIn p-4">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato">Dashboard</h2>
                    <p className="text-CafeSecondary-300">Cargando tus descubrimientos visuales...</p>
                </header>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-white rounded-2xl overflow-hidden border border-Neutral-200 animate-pulse">
                            <div className="h-44 bg-Neutral-200"></div>
                            <div className="p-5 space-y-3">
                                <div className="h-5 bg-Neutral-200 rounded w-3/4"></div>
                                <div className="h-3 bg-Neutral-100 rounded w-1/2"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="animate-fadeIn p-4">
                <header className="mb-8">
                    <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato">Dashboard</h2>
                </header>
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                    <p className="text-red-600 font-bold mb-2">Error al cargar datos</p>
                    <p className="text-red-400 text-sm">{error}</p>
                    <button 
                        onClick={() => window.location.reload()}
                        className="mt-4 px-6 py-2 bg-redPrimary-300 text-white rounded-full font-bold hover:bg-redPrimary-400 transition-colors"
                    >
                        Reintentar
                    </button>
                </div>
            </div>
        );
    }

    // Formatear fecha relativa
    const formatRelativeDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMs / 3600000);
        const diffDays = Math.floor(diffMs / 86400000);

        if (diffMins < 1) return 'justo ahora';
        if (diffMins < 60) return `hace ${diffMins} min`;
        if (diffHours < 24) return `hace ${diffHours} hora${diffHours > 1 ? 's' : ''}`;
        if (diffDays < 7) return `hace ${diffDays} día${diffDays > 1 ? 's' : ''}`;
        return date.toLocaleDateString('es-MX');
    };

    return (
        <div className="animate-fadeIn p-4">
            <header className="mb-8">
                <h2 className="text-3xl font-bold text-CafeSecondary-500 font-lato">Dashboard</h2>
                <p className="text-CafeSecondary-300">
                    Explora tus tableros y descubrimientos visuales.
                    {pins.length > 0 && <span className="ml-1 text-redPrimary-300 font-bold">({pins.length} pines)</span>}
                </p>
            </header>

            {pins.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {pins.map((pin) => (
                        <BoardCard
                            key={pin.id}
                            id={pin.id}
                            title={pin.title}
                            itemCount={1}
                            lastUpdated={formatRelativeDate(pin.created_at || pin.createdAt)}
                            coverImage={pin.image_url?.startsWith('http') ? pin.image_url : imageService.getImageUrl(pin.image_url)}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-24 text-center">
                    <div className="w-20 h-20 bg-Neutral-100 rounded-full flex items-center justify-center mb-6">
                        <span className="text-4xl">📌</span>
                    </div>
                    <p className="text-CafeSecondary-300 text-lg font-lato font-bold mb-2">Aún no hay pines</p>
                    <p className="text-CafeSecondary-200 text-sm">Crea tu primer pin desde la sección "Crear".</p>
                </div>
            )}
        </div>
    );
};

export default Dashboard;