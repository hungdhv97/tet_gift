"use client";

import React, { useEffect, useState } from "react";
import { FaFacebook, FaPhone } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { IoMail } from "react-icons/io5";
import { useFetchGifts } from "@/queries/gifts";
import { useFetchBanners, useFetchMeta } from "@/queries/metas";

const LandingPage: React.FC = () => {
    const { data: gifts } = useFetchGifts();
    const { data: banners } = useFetchBanners();
    const { data: meta } = useFetchMeta();
    const [selectedGift, setSelectedGift] = useState<GiftResponse | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [giftSlides, setGiftSlides] = useState<{ [key: number]: number }>({});

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === (banners?.length || 1) - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 3000);
        return () => clearInterval(timer);
    }, [banners]);

    useEffect(() => {
        if (gifts) {
            const initialSlides: { [key: number]: number } = {};
            gifts.forEach(gift => {
                initialSlides[gift.id] = 0;
            });
            setGiftSlides(initialSlides);
        }
    }, [gifts]);

    const nextGiftSlide = (giftId: number, imageCount: number) => {
        setGiftSlides(prevSlides => ({
            ...prevSlides,
            [giftId]: (prevSlides[giftId] + 1) % imageCount,
        }));
    };

    useEffect(() => {
        const timers: { [key: number]: NodeJS.Timeout } = {};
        if (gifts) {
            gifts.forEach(gift => {
                timers[gift.id] = setInterval(() => {
                    nextGiftSlide(gift.id, gift.images.length);
                }, 3000);
            });
        }
        return () => {
            Object.values(timers).forEach(timer => clearInterval(timer));
        };
    }, [gifts]);

    if (!gifts || !banners || !meta) return null;

    const formatPrice = (price: number) => {
        return price.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-red-600 text-white py-2 fixed top-0 left-0 w-full z-50 h-14">
                <div className="container mx-auto px-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <a href={`tel:${meta.telephone}`}
                           className="flex items-center space-x-2 hover:text-red-200">
                            <FaPhone />
                            <span>{meta.telephone}</span>
                        </a>
                        <a href={`mailto:${meta.email}`}
                           className="max-md:hidden flex items-center space-x-2 hover:text-red-200">
                            <IoMail />
                            <span>{meta.email}</span>
                        </a>
                    </div>
                    <div className="flex space-x-4">
                        <a href={meta.zalo} className="hover:text-red-200"><SiZalo size={30} /></a>
                        <a href={meta.facebook} className="hover:text-red-200"><FaFacebook size={30} /></a>
                    </div>
                </div>
            </header>

            <div className="relative h-48 md:h-screen overflow-hidden mt-14">
                {banners.map((banner: BannerResponse, index: number) => (
                    <img
                        key={banner.id}
                        src={banner.image}
                        alt={`Banner ${index + 1}`}
                        className={`absolute w-full h-full object-cover transition-opacity duration-500 ${index === currentSlide ? "opacity-100" : "opacity-0"}`}
                    />
                ))}
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
                            <div className="relative h-64 overflow-hidden">
                                {gift.images.map((image, index) => (
                                    <div
                                        key={index}
                                        className={`absolute w-full h-full transition-opacity duration-500 ${index === giftSlides[gift.id] ? "opacity-100" : "opacity-0"}`}
                                    >
                                        <img
                                            src={image.image}
                                            alt={gift.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{gift.name}</h3>
                                <p className="text-gray-600 mb-2">
                                    {gift.description.split(/[\r\n]+/).map((line, index) => (
                                        <span key={index} className="block"> - {line}</span>
                                    ))}
                                </p>
                                <p className="text-red-600 font-bold">{formatPrice(gift.price)}</p>
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
                        <div className="relative h-64 overflow-hidden">
                            {selectedGift.images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`absolute w-full h-full transition-opacity duration-500 ${index === giftSlides[selectedGift.id] ? "opacity-100" : "opacity-0"}`}
                                >
                                    <img
                                        src={image.image}
                                        alt={selectedGift.name}
                                        className="w-full h-full object-cover rounded-lg"
                                    />
                                </div>
                            ))}
                        </div>
                        <p className="text-gray-600 m-4">
                            {selectedGift.description.split(/[\r\n]+/).map((line, index) => (
                                <span key={index} className="block"> - {line}</span>
                            ))}
                        </p>
                        <p className="text-red-600 font-bold text-xl mb-4">{formatPrice(selectedGift.price)}</p>
                        <button
                            onClick={() => window.location.href = `tel:${meta.telephone}`}
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