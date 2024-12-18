"use client";

import React, { useEffect, useState } from "react";
import { FaFacebook, FaPhone, FaWhatsapp } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { useFetchGifts } from "@/queries/gifts";

const LandingPage: React.FC = () => {
    const { data: gifts } = useFetchGifts();
    const [selectedGift, setSelectedGift] = useState<GiftResponse | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const bannerImages = gifts ? gifts.flatMap((gift) => gift.images.map((image) => image.image)) : [];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [bannerImages]);

    if (!gifts) return null;

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-red-600 text-white py-2">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <a href="tel:+1234567890" className="flex items-center space-x-2 hover:text-red-200">
                            <FaPhone />
                            <span>+123 456 7890</span>
                        </a>
                        <a href="mailto:info@example.com" className="flex items-center space-x-2 hover:text-red-200">
                            <IoMail />
                            <span>info@example.com</span>
                        </a>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:text-red-200"><FaWhatsapp size={20} /></a>
                        <a href="#" className="hover:text-red-200"><FaFacebook size={20} /></a>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8 relative">
                <div className="relative h-96 overflow-hidden rounded-lg">
                    {bannerImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute w-full h-full transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                        >
                            <img
                                src={image}
                                alt={`Banner ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    ))}
                    <button
                        onClick={prevSlide}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    >
                        ←
                    </button>
                    <button
                        onClick={nextSlide}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
                    >
                        →
                    </button>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Danh sách quà tết</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {gifts.map((gift) => (
                        <div
                            key={gift.id}
                            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer transform hover:-translate-y-1 transition-transform"
                            onClick={() => setSelectedGift(gift)}
                        >
                            <img
                                src={gift.images[0]?.image}
                                alt={gift.name}
                                className="w-full h-48 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{gift.name}</h3>
                                <p className="text-gray-600 mb-2">{gift.description}</p>
                                <p className="text-red-600 font-bold">{gift.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {selectedGift && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg max-w-2xl w-full p-6">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-2xl font-bold">{selectedGift.name}</h3>
                            <button
                                onClick={() => setSelectedGift(null)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>
                        <img
                            src={selectedGift.images[0]?.image}
                            alt={selectedGift.name}
                            className="w-full h-64 object-cover rounded-lg mb-4"
                        />
                        <p className="text-gray-600 mb-4">{selectedGift.description}</p>
                        <p className="text-red-600 font-bold text-xl mb-4">{selectedGift.price}</p>
                        <button
                            className="bg-red-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-red-700 transition-colors">
                            Đặt hàng ngay
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LandingPage;