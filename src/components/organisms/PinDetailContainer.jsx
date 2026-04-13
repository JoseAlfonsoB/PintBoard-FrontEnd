// src/components/organisms/PinDetailContainer.jsx
import React from 'react';
import BoardCard from './BoardCard';
import UserSummary from '../molecules/UserSummary';
import Button from '../atoms/Button';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import ghostImage from '../../assets/ghost.jpeg';

const PinDetailContainer = ({ pinData }) => {
    const suggestions = [
        { id: 101, title: "Minimalist", itemCount: 5, lastUpdated: "2d", coverImage: null },
        { id: 102, title: "Nature", itemCount: 12, lastUpdated: "5d", coverImage: null },
    ];

    return (
        <div className="flex flex-col lg:flex-row gap-8 animate-fadeIn">
            {/* COLUMNA IZQUIERDA */}
            <div className="flex-[1.8] flex flex-col gap-6">

                {/* 1. AJUSTE EN EL CONTENEDOR DE IMAGEN */}
                <div className="relative rounded-[2.5rem] overflow-hidden shadow-lg bg-Neutral-200 group">
                    <img
                        src={pinData?.image || ghostImage }
                        alt="Pin content"
                        /* Aseguramos que la imagen no oculte nada con z-0 */
                        className="w-full object-cover relative z-0"
                    />

                    {/* 2. AJUSTE EN LOS BOTONES FLOTANTES */}
                    {/* Agregamos z-10 para que floten por ENCIMA de la imagen */}
                    <div className="absolute top-6 right-6 flex gap-3 z-10">
                        <button className="bg-white/90 p-3 rounded-full shadow-md hover:bg-white transition-all flex items-center justify-center">
                            <Share2 size={20} className="text-CafeSecondary-500" />
                        </button>

                        {/* Importante: Añadimos 'border-none' para que el estilo de tu átomo 
                            Button no interfiera con el diseño circular/redondeado */}
                        <Button
                            variant="primary"
                            className="rounded-full px-8 shadow-md border-none text-base font-bold"
                        >
                            Save
                        </Button>
                    </div>
                </div>

                {/* Info del Autor (Se mantiene igual) */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-Neutral-100 shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <UserSummary
                            name="Elena Vancini"
                            role="82.4k followers"
                        />
                        <div className="flex items-center gap-4">
                            <Button variant="neutral" className="bg-Neutral-100 rounded-full px-6 border-none">Follow</Button>
                            <div className="flex items-center gap-2 text-CafeSecondary-300">
                                <Heart size={20} fill="#EF4444" className="text-redPrimary-300" />
                                <span className="font-bold">1.2k</span>
                            </div>
                            <div className="flex items-center gap-2 text-CafeSecondary-300">
                                <MessageCircle size={20} />
                                <span className="font-bold">48</span>
                            </div>
                        </div>
                    </div>

                    {/* Comentarios (Se mantiene igual) */}
                    <div className="mt-6">
                        <h4 className="font-lato font-bold text-lg mb-4 text-CafeSecondary-500">Comments</h4>
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-Neutral-200 shrink-0"></div>
                            <input
                                type="text"
                                placeholder="Add a comment..."
                                className="w-full bg-Neutral-50 border-none rounded-2xl px-6 py-3 focus:ring-2 focus:ring-redPrimary-100 outline-none transition-all"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* COLUMNA DERECHA (Se mantiene igual) */}
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center justify-between px-2">
                    <h3 className="font-lato font-bold text-xl text-CafeSecondary-500">More like this</h3>
                    <button className="text-Neutral-400">
                        <Share2 size={18} />
                    </button>
                </div>

                <div className="grid grid-cols-1 gap-4">
                    {suggestions.map(item => (
                        <BoardCard
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            itemCount={item.itemCount}
                            lastUpdated={item.lastUpdated}
                        />
                    ))}
                </div>

                <button className="w-full py-4 bg-Neutral-100 text-CafeSecondary-400 font-bold rounded-2xl hover:bg-Neutral-200 transition-all mt-4">
                    Load more content
                </button>
            </div>
        </div>
    );
};

export default PinDetailContainer;