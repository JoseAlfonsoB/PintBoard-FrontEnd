// src/components/organisms/BoardCard.jsx
import React from 'react';
import { MoreVertical, Layers } from 'lucide-react';
import IconButton from '../atoms/IconButton';
import { Link } from 'react-router-dom';

const BoardCard = ({ id, title, itemCount, lastUpdated, coverImage }) => {

    return (
        <Link
            to={`/app/pin/${id}`}
            className="group bg-white rounded-2xl overflow-hidden border border-Neutral-200 hover:border-redPrimary-200 hover:shadow-xl transition-all duration-300 cursor-pointer block"
        >
            <div className="relative h-44 w-full bg-Neutral-200 overflow-hidden">
                {coverImage ? (
                    <img
                        src={coverImage}
                        alt={title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-tertiary-100/20">
                        <Layers className="text-tertiary-300" size={40} />
                    </div>
                )}

                {/* Overlay con botón de opciones */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <IconButton
                        Icon={MoreVertical}
                        variant="neutral"
                        className="bg-white/90 backdrop-blur-sm shadow-sm"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                        }}
                    />
                </div>
            </div>

            <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-lato font-bold text-CafeSecondary-500 text-lg group-hover:text-redPrimary-300 transition-colors truncate">
                        {title}
                    </h3>
                </div>

                <div className="flex items-center justify-between text-xs font-lato text-CafeSecondary-300">
                    <div className="flex items-center gap-1.5">
                        <Layers size={14} />
                        <span>{itemCount} elementos</span>
                    </div>
                    <span>Actualizado {lastUpdated}</span>
                </div>
            </div>
        </Link>
    );
};

export default BoardCard;