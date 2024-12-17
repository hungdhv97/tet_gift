"use client";

import React from "react";
import Link from "next/link";
import { useFetchLinks, useFetchNews } from "@/queries/news";

const NewsComponent: React.FC = () => {
    const { data: news } = useFetchNews();
    const { data: links } = useFetchLinks();
    if (!news) return null;
    if (!links) return null;
    return (
        <div className="container">
            <div className="news-container p-6 bg-gray-100">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        {news.map((news) => {
                            const firstImage = news.contents.find((content) => content.content_image)?.content_image;
                            const firstVideo = news.contents.find((content) => content.content_video)?.content_video;
                            console.log(news.id);
                            return (
                                <div key={news.id} className="news-item bg-white shadow-lg rounded-lg p-4">
                                    {firstImage && (
                                        <img
                                            src={firstImage}
                                            alt={news.title}
                                            className="w-full h-48 object-cover rounded-t-lg"
                                        />
                                    )}
                                    {!firstImage && firstVideo && (
                                        <video
                                            controls
                                            className="w-full h-48 object-cover rounded-t-lg"
                                        >
                                            <source src={firstVideo} type="video/mp4" />
                                            Your browser does not support the video tag.
                                        </video>
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                                        <Link
                                            href={`/news/${news.id}`}
                                            className="text-blue-500 hover:underline"
                                        >
                                            Đọc thêm
                                        </Link>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="links-container bg-white shadow-lg rounded-lg p-4">
                        <h3 className="text-xl font-semibold mb-4">VĂN BẢN BAN HÀNH</h3>
                        <ul className="space-y-2">
                            {links.map((link) => (
                                <Link
                                    key={link.id}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <li className="mt-2 text-blue-700 hover:bg-blue-700 hover:text-white rounded-lg p-2">
                                        {link.title}
                                    </li>
                                </Link>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsComponent;
