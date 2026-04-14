// src/components/organisms/SavedPinCard.jsx
import React from 'react';
import { X } from 'lucide-react'; // Usaremos el icono X para eliminar
import ghostImage from '../../assets/ghost.jpeg'; // Imagen por defecto

const SavedPinCard = ({ pin, onRemove }) => {
    return (
        <div className="break-inside-avoid overflow-hidden rounded-2xl bg-Neutral-100 shadow-sm hover:shadow-md transition-all group relative">
            <img
                src={pin.image || ghostImage}
                alt={pin.title || "Saved pin"}
                className="w-full h-auto object-cover block group-hover:opacity-95 transition-opacity"
            />

            {/* Overlay sutil al hacer hover */}
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity z-0"></div>

            {/* --- BOTÓN ELIMINAR FLOTANTE (Superior Derecha) --- */}
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <button
                    onClick={() => onRemove(pin.id)}
                    className="bg-white/90 p-2 rounded-full shadow-lg hover:bg-white hover:scale-110 transition-all flex items-center justify-center text-CafeSecondary-500 hover:text-redPrimary-300"
                    title="Eliminar de guardados"
                >
                    <X size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* Texto del título (Opcional, inferior) */}
            <div className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-0">
                <span className="text-white text-xs font-bold truncate block">{pin.title}</span>
            </div>
        </div>
    );
};

export default SavedPinCard;