// src/pages/PinDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PinDetailContainer from '../components/organisms/PinDetailContainer';

const PinDetail = () => {
    //! Obtenemos el ID de la URL (por ahora no lo usamos, pero servirá para el backend)
    const { id } = useParams();

    return (
        <section className="max-w-7xl mx-auto">
            <PinDetailContainer pinData={{ id }} />
        </section>
    );
};

export default PinDetail;