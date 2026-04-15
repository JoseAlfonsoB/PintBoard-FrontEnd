// src/components/molecules/LandingImageCard.jsx
import React from 'react';

const LandingImageCard = ({ src, alt }) => (
    <div className="break-inside-avoid mb-6 overflow-hidden rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
        <img src={src} alt={alt} className="w-full h-auto object-cover block" />
    </div>
);

export default LandingImageCard;