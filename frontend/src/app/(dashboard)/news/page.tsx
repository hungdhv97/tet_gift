import React from "react";

interface NewsItem {
    id: number;
    title: string;
    description: string;
    imageUrl?: string;
    videoUrl?: string;
    link: string;
}

const newsData: NewsItem[] = [
    {
        id: 1,
        title: "Sự kiện về tàu thuyền và biên phòng 1",
        description: "Mô tả ngắn gọn về sự kiện này.",
        imageUrl: "https://via.placeholder.com/400x300", // Thay bằng link hình ảnh thật
        link: "https://example.com/news-1", // Thay bằng URL thật
    },
    {
        id: 2,
        title: "Sự kiện về tàu thuyền và biên phòng 2",
        description: "Thông tin chi tiết về hoạt động của biên phòng.",
        videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4", // Thay bằng link video thật
        link: "https://example.com/news-2", // Thay bằng URL thật
    },
    {
        id: 3,
        title: "Sự kiện về tàu thuyền và biên phòng 3",
        description: "Cập nhật mới nhất liên quan đến tàu thuyền.",
        imageUrl: "https://via.placeholder.com/400x300", // Thay bằng link hình ảnh thật
        link: "https://example.com/news-3", // Thay bằng URL thật
    },
];

const NewsComponent: React.FC = () => {
    return (
        <div className="container">
            <div className="news-container p-6 bg-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {newsData.map((news) => (
                        <div key={news.id} className="news-item bg-white shadow-lg rounded-lg p-4">
                            {news.imageUrl && (
                                <img
                                    src={news.imageUrl}
                                    alt={news.title}
                                    className="w-full h-48 object-cover rounded-t-lg"
                                />
                            )}
                            {news.videoUrl && (
                                <video
                                    controls
                                    className="w-full h-48 object-cover rounded-t-lg"
                                >
                                    <source src={news.videoUrl} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            <div className="p-4">
                                <h3 className="text-xl font-semibold mb-2">{news.title}</h3>
                                <p className="text-gray-700 text-sm mb-4">{news.description}</p>
                                <a
                                    href={news.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 hover:underline"
                                >
                                    Đọc thêm
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NewsComponent;