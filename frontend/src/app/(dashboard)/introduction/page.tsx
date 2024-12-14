"use client";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const IntroductionPage: React.FC = () => {
    return (
        <div className="introduction-page max-w-7xl mx-auto p-4 space-y-8">
            <section>
                <h2 className="text-2xl font-bold text-center text-green-800 mb-4">Hình ảnh về bộ đội biên phòng</h2>
                <Carousel autoPlay infiniteLoop showThumbs={false} showArrows={true}>
                    <div>
                        <img src="https://via.placeholder.com/600x400" alt="Image 1" />
                        <p className="legend">Tiêu đề ảnh 1</p>
                    </div>
                    <div>
                        <img src="https://via.placeholder.com/600x400" alt="Image 2" />
                        <p className="legend">Tiêu đề ảnh 2</p>
                    </div>
                    <div>
                        <img src="https://via.placeholder.com/600x400" alt="Image 3" />
                        <p className="legend">Tiêu đề ảnh 3</p>
                    </div>
                </Carousel>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-4">Video về hoạt động của bộ đội biên
                    phòng</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="aspect-w-16 aspect-h-9">
                        <video controls className="w-full h-full object-cover">
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="aspect-w-16 aspect-h-9">
                        <video controls className="w-full h-full object-cover">
                            <source src="https://www.w3schools.com/html/movie.mp4" type="video/mp4" />
                        </video>
                    </div>
                    <div className="aspect-w-16 aspect-h-9">
                        <video controls className="w-full h-full object-cover">
                            <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="text-2xl font-bold text-center text-red-800 mb-4">Giới thiệu về bộ đội biên phòng</h2>
                <p className="text-lg leading-relaxed text-justify">
                    Bộ đội biên phòng Việt Nam là lực lượng vũ trang nhân dân thuộc Bộ Quốc phòng, có nhiệm vụ bảo vệ
                    chủ quyền lãnh thổ quốc gia, an ninh biên giới.
                    Họ không chỉ tham gia bảo vệ đất nước mà còn gắn bó mật thiết với cuộc sống người dân tại các vùng
                    biên giới, giúp phát triển kinh tế và bảo tồn văn hóa.
                </p>
            </section>
        </div>
    );
};

export default IntroductionPage;
                                                                                                                                                   