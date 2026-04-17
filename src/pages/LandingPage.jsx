// src/pages/LandingPage.jsx
import React, { useState } from 'react'; // Línea corregida
import { useNavigate } from 'react-router-dom';
import LandingNavbar from '../components/organisms/LandingNavbar';
import LandingImageCard from '../components/molecules/LandingImageCard';
import FeatureItem from '../components/molecules/FeatureItem';
import Button from '../components/atoms/Button';
import { Infinity, Layers, Users } from 'lucide-react';
import LoginModal from '../components/organisms/LoginModal';

// Importa tus imágenes de prueba o usa placeholders para el Masonry
import ghostImg from '../assets/ghost.jpeg';
import heroImg from '../assets/hero.png';

const LandingPage = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const navigate = useNavigate();

    const sampleImages = [
        { src: ghostImg, alt: "Inspiración 1" },
        { src: heroImg, alt: "Inspiración 2" },
        { src: ghostImg, alt: "Inspiración 3" },
        { src: heroImg, alt: "Inspiración 4" },
        { src: ghostImg, alt: "Inspiración 5" },
        { src: heroImg, alt: "Inspiración 6" },
        { src: ghostImg, alt: "Inspiración 7" },
    ];

    return (
        <div className="min-h-screen bg-white font-lato">
            <LandingNavbar onLoginClick={() => setIsLoginOpen(true)} />

            {/* HERO SECTION */}
            <header className="max-w-4xl mx-auto text-center py-20 px-4">
                <h1 className="text-6xl md:text-7xl font-bold text-CafeSecondary-500 mb-6 tracking-tight">
                    La próxima gran idea empieza aquí
                </h1>
                <p className="text-xl text-CafeSecondary-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Descubre, guarda y organiza lo que te inspira en una experiencia visual única diseñada para el proceso creativo moderno.
                </p>
            </header>

            {/* MASONRY GRID SECTION */}
            <section className="px-10 py-10">
                <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
                    {sampleImages.map((img, index) => (
                        <LandingImageCard key={index} src={img.src} alt={img.alt} />
                    ))}
                </div>
            </section>

            {/* FEATURES SECTION */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto py-32 px-10">
                <FeatureItem
                    Icon={Infinity}
                    title="Descubrimiento Infinito"
                    description="Explora una red neuronal de inspiración que aprende de tus gustos y te presenta contenido que ni sabías que buscabas."
                />
                <FeatureItem
                    Icon={Layers}
                    title="Colecciones Curadas"
                    description="Organiza tus hallazgos en tableros elegantes que se sienten como una revista de diseño personalizada."
                />
                <FeatureItem
                    Icon={Users}
                    title="Colaboración Creativa"
                    description="Comparte espacios de trabajo con tu equipo o clientes, refinando la visión estética de cada proyecto en tiempo real."
                />
            </section>

            {/* CALL TO ACTION FINAL */}
            <section className="max-w-5xl mx-auto mb-20 px-6">
                <div className="bg-Neutral-50 rounded-[3rem] py-20 px-10 text-center shadow-inner border border-Neutral-100">
                    <h2 className="text-4xl md:text-5xl font-bold text-CafeSecondary-500 mb-6">
                        ¿Listo para elevar tu visión?
                    </h2>
                    <p className="text-CafeSecondary-300 mb-10 text-lg">
                        Únete a una comunidad de creadores, diseñadores y visionarios que están transformando la forma de encontrar inspiración.
                    </p>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-black text-white px-12 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform shadow-xl"
                    >
                        Regresar al inicio
                    </button>
                </div>
            </section>

            <footer className="text-center py-10 border-t border-Neutral-100 text-sm text-CafeSecondary-200">
                <p>© 2026 PintaBoard. High-end Editorial Discovery.</p>
            </footer>
            <LoginModal 
                isOpen={isLoginOpen} 
                onClose={() => setIsLoginOpen(false)} 
            />
        </div>
    );
};

export default LandingPage;