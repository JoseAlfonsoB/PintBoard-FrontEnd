// src/components/atoms/Button.jsx
import React from 'react';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    Icon,
    className = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center font-lato transition-all duration-200 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-redPrimary-300 text-white hover:bg-redPrimary-400 focus:ring-redPrimary-200",
        secondary: "bg-CafeSecondary-300 text-white hover:bg-CafeSecondary-400 focus:ring-CafeSecondary-200",
        outline: "border-2 border-redPrimary-300 text-redPrimary-300 hover:bg-redPrimary-100",
        ghost: "bg-transparent text-CafeSecondary-400 hover:bg-Neutral-200",
    };

    const sizes = {
        sm: "px-3 py-1.5 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {Icon && <Icon className="mr-2" size={18} />}
            {children}
        </button>
    );
};

export default Button;