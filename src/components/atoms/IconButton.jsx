// src/components/atoms/IconButton.jsx
import React from 'react';

const IconButton = ({ Icon, variant = 'primary', className = '', ...props }) => {
    const variants = {
        primary: "bg-redPrimary-300 text-white hover:bg-redPrimary-400",
        secondary: "bg-CafeSecondary-300 text-white hover:bg-CafeSecondary-400",
        neutral: "bg-Neutral-200 text-CafeSecondary-400 hover:bg-Neutral-300",
        transparent: "bg-transparent text-CafeSecondary-300 hover:text-redPrimary-300"
    };

    return (
        <button
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${variants[variant]} ${className}`}
            {...props}
        >
            <Icon size={20} />
        </button>
    );
};

export default IconButton;