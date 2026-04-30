// src/components/organisms/PinDetailContainer.jsx
import React, { useState, useEffect } from 'react';
import UserSummary from '../molecules/UserSummary';
import { profileService } from '../../services/api';

const PinDetailContainer = ({ pinData }) => {
    const [author, setAuthor] = useState(null);

    // Cargar el perfil del CREADOR del pin (no del usuario logueado)
    useEffect(() => {
        const fetchAuthor = async () => {
            if (!pinData?.user_id) return;
            try {
                const authorProfile = await profileService.getProfile(pinData.user_id);
                setAuthor(authorProfile);
            } catch (err) {
                console.warn('No se pudo cargar el perfil del autor:', err.message);
                setAuthor(null);
            }
        };
        fetchAuthor();
    }, [pinData?.user_id]);

    // Imagen del pin (ya viene transformada desde PinDetail.jsx)
    const pinImage = pinData?.image || pinData?.image_url;
    const authorName = author?.first_name || `Usuario #${pinData?.user_id}`;
    const authorRole = author?.role || '';
    const authorAvatar = author?.avatar_url || null;

    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-fadeIn">
            <div className="flex-[1.8] flex flex-col gap-6">
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-lg bg-Neutral-200 group">
                    {pinImage ? (
                        <img
                            src={pinImage}
                            alt={pinData?.title || "Pin content"}
                            className="w-full object-cover relative z-0"
                        />
                    ) : (
                        <div className="w-full h-64 flex items-center justify-center bg-Neutral-100">
                            <span className="text-CafeSecondary-200 text-lg">Sin imagen</span>
                        </div>
                    )}

                    {pinData?.external_link && (
                        <div className="absolute top-6 right-6 z-10">
                            <a
                                href={pinData.external_link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white/90 px-6 py-3 rounded-full shadow-md hover:bg-white transition-all font-bold text-sm text-CafeSecondary-500"
                            >
                                Visitar enlace →
                            </a>
                        </div>
                    )}
                </div>

                {/* Info del Pin y el Autor */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-Neutral-100 shadow-sm">
                    {/* Título y descripción del pin */}
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-CafeSecondary-500 font-lato mb-2">
                            {pinData?.title || 'Sin título'}
                        </h2>
                        {pinData?.description && (
                            <p className="text-CafeSecondary-300 font-lato leading-relaxed">
                                {pinData.description}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center">
                        <UserSummary
                            name={authorName}
                            role={authorRole}
                            avatarUrl={authorAvatar}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PinDetailContainer;