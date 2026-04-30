// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import EditProfileModal from '../components/organisms/EditProfileModal';
import SavedPinCard from '../components/organisms/SavedPinCard';
import { useAuth } from '../context/AuthContext';
import { pinService, imageService } from '../services/api';

const Profile = () => {
    const { user, profile } = useAuth();

    // ESTADOS
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [userPins, setUserPins] = useState([]);
    const [loadingPins, setLoadingPins] = useState(false);

    // Cargar pines del usuario desde el backend
    useEffect(() => {
        const fetchUserPins = async () => {
            if (!user) return;
            try {
                setLoadingPins(true);
                const data = await pinService.getPinsByUser(user.id);
                const transformedPins = (data || []).map(pin => ({
                    ...pin,
                    image: pin.image_url?.startsWith('http')
                        ? pin.image_url
                        : imageService.getImageUrl(pin.image_url),
                }));
                setUserPins(transformedPins);
            } catch (err) {
                console.error('Error al cargar pines del usuario:', err);
            } finally {
                setLoadingPins(false);
            }
        };

        fetchUserPins();
    }, [user]);

    // Función para eliminar un pin
    const handleRemovePin = async (pinId) => {
        try {
            await pinService.deletePin(pinId);
            setUserPins(prev => prev.filter(pin => pin.id !== pinId));
        } catch (err) {
            console.error('Error al eliminar pin:', err);
            alert('Error al eliminar el pin: ' + err.message);
        }
    };

    // Nombre y username del perfil real o fallback
    const displayName = profile?.first_name || user?.email?.split('@')[0] || 'Usuario';
    const displayUsername = profile?.username || user?.email?.split('@')[0] || 'user';
    const displayRole = profile?.role || '';
    const avatarUrl = profile?.avatar_url;

    return (
        <div className="max-w-6xl mx-auto py-10 px-4 animate-fadeIn">
            {/* Header de Perfil */}
            <header className="flex flex-col items-center text-center mb-12">
                <div className="w-32 h-32 rounded-full bg-Neutral-200 mb-4 overflow-hidden border-4 border-white shadow-sm">
                    {avatarUrl ? (
                        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-tertiary-300 text-white text-4xl font-bold">
                            {displayName.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                <h2 className="text-4xl font-bold text-CafeSecondary-500 font-lato mb-1">
                    {displayName}
                </h2>
                <p className="text-CafeSecondary-300 font-lato mb-6">
                    @{displayUsername}
                    {displayRole && <span className="ml-2">· {displayRole}</span>}
                </p>

                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-6 py-2.5 bg-Neutral-100 text-CafeSecondary-500 rounded-full font-bold hover:bg-Neutral-200 transition-colors"
                >
                    Editar perfil
                </button>
            </header>

            {/* Título de sección */}
            <div className="border-b border-Neutral-100 mb-10 pb-4">
                <h3 className="text-center font-bold text-CafeSecondary-500 text-lg">
                    Mis Pines
                    {userPins.length > 0 && (
                        <span className="ml-2 text-redPrimary-300">({userPins.length})</span>
                    )}
                </h3>
            </div>

            {/* Vista de Pines */}
            <div className="w-full animate-fadeIn">
                {loadingPins ? (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="break-inside-avoid h-48 bg-Neutral-200 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                ) : userPins.length > 0 ? (
                    <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                        {userPins.map((pin) => (
                            <SavedPinCard
                                key={pin.id}
                                pin={pin}
                                onRemove={handleRemovePin}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 bg-Neutral-100 rounded-full flex items-center justify-center mb-6">
                            <span className="text-4xl">📌</span>
                        </div>
                        <p className="text-CafeSecondary-300 text-lg font-lato font-bold mb-2">
                            Aún no has creado ningún pin
                        </p>
                        <p className="text-CafeSecondary-200 text-sm">
                            Ve a la sección "Crear" para publicar tu primer pin.
                        </p>
                    </div>
                )}
            </div>

            <EditProfileModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default Profile;