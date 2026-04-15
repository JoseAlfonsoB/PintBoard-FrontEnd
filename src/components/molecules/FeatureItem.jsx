// src/components/molecules/FeatureItem.jsx
import React from 'react';

const FeatureItem = ({ Icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-4">
        <div className="text-redPrimary-300 mb-4">
            {Icon && <Icon size={40} strokeWidth={1.5} />}
        </div>
        <h3 className="font-lato font-bold text-xl text-CafeSecondary-500 mb-2">{title}</h3>
        <p className="text-CafeSecondary-300 text-sm leading-relaxed max-w-xs">{description}</p>
    </div>
);

export default FeatureItem;