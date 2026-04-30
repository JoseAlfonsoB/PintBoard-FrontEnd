// src/pages/PinDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PinDetailContainer from '../components/organisms/PinDetailContainer';
import { pinService, imageService } from '../services/api';

const PinDetail = () => {
    const { id } = useParams();
    const [pinData, setPinData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPin = async () => {
            try {
                setLoading(true);
                const data = await pinService.getPinById(id);
                // Transformar image_url a una URL accesible
                const transformedPin = {
                    ...data,
                    image: data.image_url?.startsWith('http') 
                        ? data.image_url 
                        : imageService.getImageUrl(data.image_url),
                };
                setPinData(transformedPin);
            } catch (err) {
                console.error('Error al cargar el pin:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPin();
    }, [id]);

    if (loading) {
        return (
            <section className="max-w-7xl mx-auto py-10 animate-fadeIn">
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="flex-[1.8] flex flex-col gap-6">
                        <div className="rounded-[2.5rem] overflow-hidden bg-Neutral-200 h-96 animate-pulse"></div>
                        <div className="bg-white p-8 rounded-[2.5rem] border border-Neutral-100 animate-pulse">
                            <div className="h-6 bg-Neutral-200 rounded w-1/3 mb-4"></div>
                            <div className="h-4 bg-Neutral-100 rounded w-1/4"></div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="max-w-7xl mx-auto py-10">
                <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
                    <p className="text-red-600 font-bold mb-2">Pin no encontrado</p>
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            </section>
        );
    }

    return (
        <section className="max-w-7xl mx-auto py-10">
            <PinDetailContainer pinData={pinData} />
        </section>
    );
};

export default PinDetail;