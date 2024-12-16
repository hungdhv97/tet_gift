"use client";

import React from "react";
import { FaRegClock } from "react-icons/fa";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { useParams } from "next/navigation";
import { useFetchNewsPost } from "@/queries/news";

const NewsArticle: React.FC = () => {
    const params = useParams<{ newsId: string }>();
    const newsId = parseInt(params.newsId);
    const { data: newsPost } = useFetchNewsPost(newsId);
    if (!newsPost) return null;

    const formatDate = (dateString: string): string => {
        return format(new Date(dateString), "EEEE, dd MMMM yyyy, h:mm a", { locale: vi });
    };

    const renderContent = (content: NewsContentResponse, index: number) => {
        switch (content.content_type) {
            case "text":
                return (
                    <div key={index} className="my-4">
                        <p className="indent-8 text-gray-700 leading-relaxed text-justify">{content.content_text}</p>
                    </div>
                );

            case "image":
                return (
                    <figure key={index} className="my-6 flex flex-col items-center">
                        <img
                            src={content.content_image || ""}
                            alt={content.caption || "Article image"}
                            className="w-full max-w-4xl h-auto rounded-lg shadow-lg"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321497487-e288fb19713f";
                            }}
                        />
                        {content.caption && (
                            <figcaption className="mt-2 text-sm text-center text-gray-600">
                                {content.caption}
                            </figcaption>
                        )}
                    </figure>
                );

            case "video":
                return (
                    <div key={index} className="my-6 flex flex-col items-center">
                        <video
                            controls
                            poster={content.content_image || ""}
                            className="w-full max-w-4xl h-auto rounded-lg shadow-lg"
                            onError={(e) => {
                                (e.target as HTMLVideoElement).poster = "https://images.unsplash.com/photo-1516321497487-e288fb19713f";
                            }}
                        >
                            <source src={content.content_video || ""} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {content.caption && (
                            <figcaption className="mt-2 text-sm text-center text-gray-600">
                                {content.caption}
                            </figcaption>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <article className="container min-h-screen">
            <header className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {newsPost.title}
                </h1>
                <div
                    className="flex flex-col sm:flex-row sm:items-center text-sm text-gray-600 space-y-2 sm:space-y-0 sm:space-x-6">
                    <div className="flex items-center">
                        <FaRegClock className="mr-2" />
                        <span>Ngày tạo: {formatDate(newsPost.created_at)}</span>
                    </div>
                    <div className="flex items-center">
                        <FaRegClock className="mr-2" />
                        <span>Cập nhật: {formatDate(newsPost.updated_at)}</span>
                    </div>
                </div>
            </header>

            <main className="prose max-w-none">
                {newsPost.contents.map((content, index) => renderContent(content, index))}
            </main>
        </article>
    );
};

export default NewsArticle;
