"use client";

import React, { useEffect, useState } from "react";
import { FaFacebook, FaPhone, FaWhatsapp } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

type GiftType = {
    id: number;
    type: string;
    description: string;
    image: string;
};

type Gift = {
    id: number;
    name: string;
    price: string;
    description: string;
    image: string;
};

const LandingPage: React.FC = () => {
    const [selectedGift, setSelectedGift] = useState<Gift | null>(null);
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    const giftTypes: GiftType[] = [
        {
            id: 1,
            type: "Hộp quà tết",
            description: "Những hộp quà tết sang trọng và ý nghĩa",
            image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a",
        },
        {
            id: 2,
            type: "Giỏ quà tết",
            description: "Giỏ quà tết đa dạng, phong phú",
            image: "https://images.unsplash.com/photo-1512909006721-3d6018887383",
        },
    ];

    const gifts: Gift[] = [
        {
            id: 1,
            name: "Premium Gift Box",
            price: "$99.99",
            description: "Luxury gift box with premium selections",
            image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
        },
        {
            id: 2,
            name: "Traditional Basket",
            price: "$79.99",
            description: "Traditional items in beautiful arrangement",
            image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574",
        },
        {
            id: 3,
            name: "Deluxe Hamper",
            price: "$149.99",
            description: "Exclusive collection of premium items",
            image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a",
        },
    ];

    const bannerImages: string[] = [
        "https://images.unsplash.com/photo-1512909006721-3d6018887383",
        "https://images.unsplash.com/photo-1513885535751-8b9238bd345a",
        "https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === bannerImages.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? bannerImages.length - 1 : prev - 1));
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, []);

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
                <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Loại quà tết</h2>
                <div className="grid md:grid-cols-2 gap-8">
                    {giftTypes.map((type) => (
                        <div key={type.id} className="relative overflow-hidden rounded-lg shadow-lg group">
                            <img
                                src={type.image}
                                alt={type.type}
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div
                                className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white p-4">
                                <h3 className="text-2xl font-bold mb-2">{type.type}</h3>
                                <p className="text-center">{type.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-red-50 py-12">
                <div className="container mx-auto px-4">
                    <div className="bg-red-600 rounded-lg p-8 text-white text-center">
                        <h2 className="text-3xl font-bold mb-4">Ưu đãi đặc biệt</h2>
                        <p className="text-xl mb-6">Giảm giá 20% cho đơn hàng trên $200</p>
                        <button
                            className="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-red-100 transition-colors">
                            Xem ngay
                        </button>
                    </div>
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
                                src={gift.image}
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
                            src={selectedGift.image}
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

            <footer className="bg-gray-800 text-white py-12">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <h4 className="text-xl font-bold mb-4">Liên hệ</h4>
                            <p className="mb-2">123 Đường ABC, Quận XYZ</p>
                            <p className="mb-2">Email: info@example.com</p>
                            <p>Phone: +123 456 7890</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-4">Theo dõi chúng tôi</h4>
                            <div className="flex space-x-4">
                                <FaFacebook size={24} className="cursor-pointer hover:text-red-400" />
                                <FaWhatsapp size={24} className="cursor-pointer hover:text-red-400" />
                            </div>
                        </div>
                        <div>
                            <h4 className="text-xl font-bold mb-4">Giờ làm việc</h4>
                            <p className="mb-2">Thứ 2 - Thứ 6: 9:00 - 18:00</p>
                            <p>Thứ 7 - Chủ nhật: 9:00 - 17:00</p>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                        <p>© 2024 Gift Shop. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;