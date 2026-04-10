// src/components/atoms/Input.jsx
import React from 'react';

const Input = ({ label, error, className = '', ...props }) => {
    return (
        <div className="flex flex-col w-full gap-1.5">
            {label && <label className="text-sm font-medium text-CafeSecondary-400 font-lato">{label}</label>}
            <input
                className={`
                    
                    w-full px-4 py-2 rounded-md border bg-Neutral-50 text-CafeSecondary-500 font-lato
                border-Neutral-300 focus:border-redPrimary-300 focus:ring-1 focus:ring-redPrimary-300
                outline-none transition-all placeholder:text-Neutral-400
                ${error ? 'border-red-500' : ''}
                ${className}
        `}
                {...props}
            />
            {error && <span className="text-xs text-red-500 mt-1">{error}</span>}
        </div>
    );
};

export default Input;