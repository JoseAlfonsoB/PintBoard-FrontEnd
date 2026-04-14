// src/components/organisms/CompositeBoardCard.jsx
import React from 'react';
import { Layers } from 'lucide-react';

const CompositeBoardCard = ({ title, itemCount, images = [] }) => {
    // Fallback por si no hay suficientes imágenes
    const placeholders = [null, null, null];
    const displayImages = [...images, ...placeholders].slice(0, 3);

    return (
        <div className="group cursor-pointer flex flex-col gap-3">
            {/* Contenedor del Collage con bordes muy redondeados */}
            <div className="grid grid-cols-3 gap-1 h-52 rounded-[2rem] overflow-hidden border border-Neutral-100 shadow-sm group-hover:shadow-md transition-shadow">

                {/* Imagen Principal (Grande - Izquierda) */}
                <div className="col-span-2 bg-Neutral-100 overflow-hidden">
                    {displayImages[0] ? (
                        <img
                            src={displayImages[0]}
                            alt={title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-Neutral-50">
                            <Layers className="text-Neutral-200" size={32} />
                        </div>
                    )}
                </div>

                {/* Columna de Imágenes Secundarias (Derecha) */}
                <div className="grid grid-rows-2 gap-1">
                    <div className="bg-Neutral-200 overflow-hidden">
                        {displayImages[1] && (
                            <img src={displayImages[1]} className="w-full h-full object-cover" alt="" />
                        )}
                    </div>
                    <div className="bg-Neutral-300 overflow-hidden">
                        {displayImages[2] && (
                            <img src={displayImages[2]} className="w-full h-full object-cover" alt="" />
                        )}
                    </div>
                </div>
            </div>

            {/* Información del Tablero */}
            <div className="px-2">
                <h3 className="font-lato font-bold text-CafeSecondary-500 text-lg leading-tight">
                    {title}
                </h3>
                <p className="text-sm text-CafeSecondary-300 font-lato">
                    {itemCount} pines
                </p>
            </div>
        </div>
    );
};

export default CompositeBoardCard;