"use client";

import React from "react";
import { useFetchNews } from "@/queries/news";

const NewsComponent: React.FC = () => {
    const { data: news } = useFetchNews();
    if (!news) return null;

    return (
        <div className="container">
            <div className="news-container p-6 bg-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                    <a
                                        href={`/news/${news.id}`}
                                        className="text-blue-500 hover:underline"
                                    >
                                        Đọc thêm
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default NewsComponent;
