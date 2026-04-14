// src/pages/PinDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import PinDetailContainer from '../components/organisms/PinDetailContainer';
// Importamos una imagen por defecto para las pruebas
import ghostImage from '../assets/ghost.jpeg';

const PinDetail = () => {
    const { id } = useParams();

    // Simulamos los datos que vendrían de una API basándonos en el ID
    const pinData = {
        id: id,
        title: id === "1" ? "Inspiración Recámara" : "Proyecto PintBoard",
        image: ghostImage // Aquí podrías mapear imágenes según el ID
    };

    return (
        <section className="max-w-7xl mx-auto py-10">
            {/* Pasamos el objeto pinData completo */}
            <PinDetailContainer pinData={pinData} />
        </section>
    );
};

export default PinDetail;